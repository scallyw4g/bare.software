let InitCursor = (CursorElement) => {
  Assert(CursorElement instanceof TypedElement);

  CursorElement.Dom.classList.add("typing-active");
  SetDisplay(CursorElement.Dom, DISPLAY_INLINE_BLOCK);
}

let PurgeCursors = (Dom) => {
  Assert(Dom instanceof HTMLElement);
  Array.from(Dom.getElementsByClassName("typing-active"))
    .forEach( Element => Element.classList.remove("typing-active") );
}

let blink = (Cursor, Route) => {
  Assert(Cursor instanceof HTMLElement);
  Assert(Route instanceof MakeRoute);

  let blinkTime = 650;
  let blinkTick = blinkTime/3;

  return new Promise( (resolve, reject) => {

    if (Route.AnimationStatus.cancelled) { reject("Blink"); return; }

    // Blink off
    Cursor.classList.add("cursor-off");

    // Blink on
    setTimeout( () => {
      Cursor.classList.remove("cursor-off");
    }, blinkTick );

    // Fin
    setTimeout( () => {
      resolve();
    }, blinkTick*3 );
  });
}

let blinkCursor = (Route, count) => {
  Assert(Route instanceof MakeRoute);

  let Cursor = document.body.querySelector(".typing-active");
  Assert(Cursor instanceof HTMLElement);

  // TODO(Jesse): Is there a better way to do this?
  let promise = new Promise( (resolve) => { resolve() } );

  while (--count >= 0) {
    promise = promise.then( () => {
      return blink(Cursor, Route);
    });
  }

  return promise;
}
