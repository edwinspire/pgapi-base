<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte/internal";
  import { CurrentUser } from "./Store.js";
  const jwt = require("jsonwebtoken");
  let Authorized = true;
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
    CurrentUser.set(decoded);
    if (decoded && new Date() < new Date(decoded.exp * 1000)) {
      Authorized = true;
    } else {
      Authorized = false;
      setTimeout(() => {
        goto("/");
      }, 5000);
    }
  });
</script>

<div>
  {#if Authorized}
    <slot />
  {:else}
    <div class="MainContainer">
      <div>
        <p class="has-text-centered title is-1">
          <span class="icon is-large">
            <i class="fas fa-2x fa-user-lock" />
          </span>
        </p>
        <p class="has-text-centered my-5 subtitle is-3">ACCESO NO AUTORIZADO</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .MainContainer {
    padding: 3em;
  }
</style>
