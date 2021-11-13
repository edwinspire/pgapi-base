<script context="module">
  var { CheckSession } = require("./Preload");
  export function preload(page, session) {
    return CheckSession(this, page, session, "/");
  }
</script>

<div>
  <slot name="content" />
</div>
