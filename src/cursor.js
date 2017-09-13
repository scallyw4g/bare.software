
let blink = (Cursor, RenderDom) => {
  Assert(Cursor instanceof HTMLElement);
  Assert(RenderDom instanceof HTMLElement);

  let blinkTime = 750;
  let blinkTick = blinkTime/3;

  return new Promise( (resolve, reject) => {

    // Blink off
    Cursor.classList.add("off");
    Render(RenderDom);

    // Blink on
    setTimeout( () => {
      Cursor.classList.remove("off");
      Render(RenderDom);
    }, blinkTick );

    // Fin
    setTimeout( () => {
      Render(RenderDom);
      resolve();
    }, blinkTick*3 );
  });
}

let blinkCursor = (Dom, count) => {
  Assert(Dom instanceof HTMLElement);

  let Cursor = Dom.querySelector(".typing-active");
  Assert(Cursor instanceof HTMLElement);

  // TODO(Jesse): Is there a better way to do this?
  let promise = new Promise( (resolve) => { resolve() } );

  while (--count >= 0) {
    promise = promise.then( () => {
      return blink(Cursor, Dom);
    });
  }

  return promise;
}