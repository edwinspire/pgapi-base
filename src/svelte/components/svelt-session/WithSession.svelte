<script context="module">
  export function preload(page, session) {
    return { page, session };
  }
</script>

<script>
  export let session;
  export let page;
  import { CurrentSession } from "./Store";

  CurrentSession.set(session);

  console.log(page, session, CurrentSession);
</script>

<div>
  <slot name="content" />
</div>
