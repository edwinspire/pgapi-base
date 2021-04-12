<script>
    import { onMount } from "svelte";
    import { CurrentSession } from "@edwinspire/svelt-session/Store";
    let NavOnLine = false;
    let MenuOpen = false;
  
    function ToggleClassMenu() {
      console.log("Toogle");
      MenuOpen = !MenuOpen;
    }

  
    onMount(async () => {    
      console.dir(CurrentSession);
      NavOnLine = window.navigator.onLine;
      window.addEventListener("offline", (event) => {
        NavOnLine = false;
      });
      window.addEventListener("online", (event) => {
        NavOnLine = true;
      });
    });
  </script>
  
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/home">
        <span class="icon">
          <img
            src="logo.png"
            width="20"
            height="20"
            alt="TIENDA ONLINE"
          />
        </span>
  
        <strong> TIENDA ONLINE</strong>
      </a>
      <span class="navbar-item">
        <span
          class="icon"
          class:has-text-success={NavOnLine}
          class:has-text-danger={!NavOnLine}
        >
          <i class="fas fa-wifi" />
        </span>
      </span>
  
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class:is-active={MenuOpen}
        on:click={ToggleClassMenu}
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
  
    <div class="navbar-menu" class:is-active={MenuOpen}>
      <div class="navbar-start">
        <a href="/pgAPI" class="navbar-item">pgAPI</a>
  
        
        <a href="/pgapi/test"  class="navbar-item">Test Session</a>
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="button is-light" > {$CurrentSession.user.fullname} </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" href="/logout"> Logout </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  