export const setupDirectives = (app) => {
  app.directive('phone', {
    beforeMount(el) {
      function replaceNumberForInput(value) {
        let val = '';
        const x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

        if (!x[2] && x[1] !== '') {
          val = x[1] === '8' ? '+7' : `+7 (`;
        } else {
          val = !x[3]
            ? `+7 (${x[2]}`
            : `+7 (${x[2]}) ${x[3]}${x[4] ? ` ${x[4]}` : ''}${x[5] ? ` ${x[5]}` : ''}`;
        }

        if (val.length > 18) {
          val.slice(0, -1);
        }

        return val;
      }

      function replaceNumberForPaste(value) {
        const r = value.replace(/\D/g, '');
        let val = r;
        if (val.charAt(0) === '8') {
          val = `+7${val.slice(1)}`;
        }
        return replaceNumberForInput(val);
      }

      el.oninput = function (e) {
        if (!e.isTrusted) {
          return;
        }
        this.value = replaceNumberForInput(this.value);
      };

      el.onpaste = function () {
        setTimeout(() => {
          const pasteVal = el.value;
          this.value = replaceNumberForPaste(pasteVal);
        });
      };
    },
  });
};
