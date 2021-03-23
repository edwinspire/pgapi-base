<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte/internal";
  const jwt = require("jsonwebtoken");
  let Show = false;
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  onMount(() => {
    var decoded = jwt.decode(getCookie("TOKEN_USER"), { complete: false });

    console.log(decoded);

    if (decoded && new Date() < new Date(decoded.exp * 1000)) {
      console.log(
        "ok",
        new Date(decoded.exp * 1000),
        new Date(decoded.iat * 1000)
      );
      Show = true;
    } else {
      goto("/");
    }
  });
</script>

<div>
  {#if Show}
    <slot />
  {/if}
</div>
