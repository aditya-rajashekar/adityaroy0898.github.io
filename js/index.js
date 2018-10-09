const rate = 0.15,
      defaultText = "Happy birthday Aadi!";
let del = 0;

m.mount(document.getElementById("mount"), {

  oninit : (vnode) => {
    vnode.state.text = defaultText;
  },
  view : (vnode) => [
    m("p", "click text to edit"),
    vnode.state.edit ?
    m("input", {
      oncreate : (inputVnode) => {
        vnode.state.input = inputVnode;
        inputVnode.dom.focus();
        inputVnode.dom.select();
      },
      onblur : () => {
        vnode.state.edit = false;
      },
      onkeydown : (e) => {
        if(e.keyCode === 13) {
          vnode.state.edit = false;
          return;
        }
      },
      oninput : m.withAttr("value", (value) => {
        vnode.state.text = value;
      }),
      value : vnode.state.text
    }) : 
    m("h1", {
      onclick : () => {
        vnode.state.edit = true;
        if(vnode.state.input) {
          vnode.state.input.dom.focus();
        }
      }
    },
      vnode.state.text
        .split("")
        .map((char, idx, arr) => {
            ++del; // not using idx to skip space

             if(char === " ") {
               char = " "; // nbsp
               --del;
             }

             return m("span.char", {
                style : {
                  animationDelay : `${del * rate}s`,
                  animationDuration: `${arr.length * rate * 1.6}s`
                }
             }, char);
        })
      )
    ]

});
