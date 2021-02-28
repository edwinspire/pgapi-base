<script>
  import { createEventDispatcher } from "svelte";
  import { FetchData } from "./FetchData.js";

  let class_menu = "close";
  let text_search = "";


  const dispatch = createEventDispatcher();

  function handleClickSearch() {
    dispatch("search", {
      text: text_search,
    });
  }

  function openNav() {
    class_menu = "open";
  }

  function closeNav() {
    class_menu = "close;";
  }
</script>

<style>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;

    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 1px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 1.2em;

    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }

  .open {
    width: 250px;
  }
  .subt {
    color: azure;
  }
  .close {
    width: 0px;
  }
  .root {
    padding: 0.2em 1em 0.2em 0.5em;
    margin-bottom: 0.5rem;
  }

  .size_search {
    width: 10em;
  }
  .close_icon {
    position: relative;
    left: 9.5em;
  }
</style>

<div class="sidenav has-background-dark {class_menu}">
  <!-- svelte-ignore a11y-missing-attribute -->
  <a class="close_icon" on:click={closeNav}>
    <i class="fa fa-times" />
  </a>
  <a href="home">
    <i class="fas fa-home" />
    HOME
  </a>


  <a href="/">
    <i class="fas fa-power-off" />
    SALIR
  </a>
</div>

<!-- Main container -->
<nav class=" level gbackground-blue is-mobile root">
  <!-- Left side -->
  <div class="level-left">
    <div class="has-text-light level-item">
      <p class="has-text-weight-bold">
        <slot name="Title">INDEX</slot>
      </p>
    </div>


  </div>

  <!-- Right side -->
  <div class="level-right">


    <!-- svelte-ignore a11y-missing-attribute -->
    <p class="level-item" />
    <p class="level-item ">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a style="cursor:pointer" on:click={openNav}>
        <i class="fas fa-bars" />
      </a>
    </p>

  </div>
</nav>
