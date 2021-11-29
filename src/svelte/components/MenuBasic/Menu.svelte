<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import uFetch from "@edwinspire/universal-fetch";
  const { session } = stores();

  var FData;
  var ConfigMenu = {};
  export let Title = "Menu";

  function CheckPermissions(ispublic, roles, users) {
    if (ispublic) {
      return true;
    } else if ($session.user && $session.user.rol) {
      return (
        roles.includes("*") ||
        roles.includes($session.user.rol) ||
        users.includes($session.user.username)
      );
    } else {
      return false;
    }
    /*
    return (
      ispublic ||
      (!menu.ispublic &&
        (
          ))
    );
    */
  }

  /*
  const ConfigMenu = {
    title: "Menu",
    navbar_start: [
      {
        label: "Eventos",
        enabled: false,
        visible: true,
        authorization: { roles: ["*"], users: [] },
        items: [
          {
            authorization: { roles: ["*"], users: [] },
            label: "Vista General",
            href: "/oms/summary",
            enabled: true,
            visible: false,
          },
          {
            enabled: false,
            visible: true,
            label: "Monitor WS SAP",
            href: "/farma/check_ws_consulta_registro_dep_sap_grafico/test",
          },
        ],
      },
      {
        enabled: true,
        visible: true,
        label: "Reg. Depositos",
        href: "/farma/registro_depositos/consultar",
      },
      {
        enabled: true,
        visible: true,
        label: "Inconsistencia Farmacias",
        items: [
          {
            enabled: false,
            visible: true,
            label: "Consultar",
            href: "/farma/inconsistencias/revision/consultar",
          },
          {
            enabled: true,
            visible: true,
            label: "Pendientes",
            href: "/farma/inconsistencias/revision",
          },
        ],
      },
      {
        enabled: true,
        visible: true,
        label: "Facturación",
        items: [
          {
            enabled: true,
            visible: true,
            label: "SAP Reporte",
            href: "/farma/fact_elect_sap",
          },

          {
            enabled: true,
            visible: true,
            label: "SAP Novedades",
            href: "/farma/fact_elect_sap_novedades",
          },
          { divider: true },
          {
            enabled: true,
            visible: true,
            label: "Doc. PV sin Autorizar",
            href: "/farma/fact_elect_pv_sin_aut",
          },

          {
            enabled: true,
            visible: true,
            label: "Guías con novedades",
            href: "/farma/consulta_guias_con_novedades",
          },
          { divider: true },
          {
            enabled: true,
            visible: true,
            label: "CAR Documentos sin Aut.",
            href: "/farma/fact_elect_pv_car_sin_aut",
          },
        ],
      },
      {
        enabled: true,
        visible: true,
        label: "Procesos SAP",
        items: [
          {
            enabled: true,
            visible: true,
            label: "Devoluciones Farmacias",
            href: "/farma/carga_devoluciones_farmacias",
          },

          {
            enabled: true,
            visible: true,
            label: "Planes de mercadeo",
            href: "/farma/carga_planes_mercadeo",
          },
          {
            enabled: true,
            visible: true,
            label: "Transferencias Farmacias",
            href: "/farma/carga_transferencias_farmacias",
          },
          { divider: true },
          {
            enabled: true,
            visible: true,
            label: "Ventas de Matriz a SAP",
            href: "/farma/carga_ventas_matriz_sap",
          },

          {
            enabled: true,
            visible: true,
            label: "Ventas de Matriz Faltantes en SAP",
            href: "/farma/cargar_ventas_matriz_faltante_sap",
          },
          { divider: true },
          {
            enabled: true,
            visible: true,
            label: "Log de Seguimientos",
            href: "/farma/log_seguimiento_sap",
          },
          { divider: true },
          {
            enabled: true,
            visible: true,
            label: "Log pa_CambiarEstadoFactReserv",
            href: "/farma/log_pa_cambiar_estado_factReserv",
          },
        ],
      },
      {
        label: "Integrador",
        items: [
          {
            enabled: true,
            visible: true,
            label: "Clientes Duplicados",
            href: "/farma/ite_integradorsap_tbl_cliente_duplicados",
          },

          {
            enabled: true,
            visible: true,
            label: "Sincronización Número IdGrupo",
            href: "/farma/clientes_novedad_con_asignacion_corporativo",
          },
          {
            enabled: true,
            visible: true,
            label: "Sincronización Proveedores",
            href: "/farma/ite_integrador_sincronizacion_proveedores",
          },
        ],
      },
      {
        enabled: true,
        visible: true,
        label: "Información",
        items: [
          {
            enabled: true,
            visible: true,
            label: "Farmacias",
            href: "/farma/farmacias",
          },

          {
            enabled: true,
            visible: true,
            label: "Ctrl Comunicaciones",
            href: "/farma/control_comunicaciones",
          },
        ],
      },
    ],
    navbar_end: [{}],
  };
*/
  let MenuOpen = false;

  function ToggleClassMenu() {
    console.log("Toogle");
    MenuOpen = !MenuOpen;
  }

  onMount(async () => {
    //    console.dir(CurrentSession);
    FData = new uFetch();
    let resp = await FData.get("/pgapi_v1/admin/gui/menu");
    let data = await resp.json();

    ConfigMenu = {
      title: Title,
      navbar_start: data,
    };

    console.log(ConfigMenu);
  });
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/oms/summary">
      <span class="icon">
        <img
          src="logo.png"
          width="20"
          height="20"
          alt="SISTEMA DE VALIDACIONES"
        />
      </span>

      <strong>{ConfigMenu.title}</strong>
    </a>

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
      {#if ConfigMenu.navbar_start}
        {#if Array.isArray(ConfigMenu.navbar_start) && ConfigMenu.navbar_start.length > 0}
          {#each ConfigMenu.navbar_start as menu}
            {#if menu.visible && CheckPermissions(menu.ispublic, menu.roles, menu.users)}
              {#if menu.items && menu.items.length > 0}
                <div class="navbar-item has-dropdown is-hoverable">
                  <!-- svelte-ignore a11y-missing-attribute -->

                  {#if menu.enabled}
                    <a class="navbar-link">{menu.label}</a>
                    <div class="navbar-dropdown">
                      {#each menu.items as subitem}
                        {#if subitem.asdivider}
                          <hr class="navbar-divider" />
                        {:else if subitem.visible && CheckPermissions(subitem.ispublic, subitem.roles, subitem.users)}
                          {#if subitem.enabled}
                            <a class="navbar-item" href={subitem.url || "#"}
                              >{subitem.label}</a
                            >
                          {:else}
                            <span class="navbar-item item_disabled"
                              >{subitem.label}</span
                            >
                          {/if}
                        {/if}
                      {/each}
                    </div>
                  {:else}
                    <span class="navbar-link item_disabled">{menu.label}</span>
                  {/if}
                </div>
              {:else}
                <a href={menu.url} class="navbar-item">{menu.label}</a>
              {/if}
            {/if}
          {/each}
        {/if}
      {/if}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div
          class="button is-small is-link is-outlined"
          href="/pgapi_v1/logout"
        >
          <span class="icon is-small">
            <i class="fas fa-user-tie" />
          </span>
          <span>
            {#if $session && $session.user && $session.user.username}
              <span>{$session.user.username}</span>
            {:else}
              <span>Anónimo</span>
            {/if}
          </span>
        </div>
      </div>
      <div class="navbar-item">
        <a
          class="button is-small is-danger is-outlined"
          href="/pgapi_v1/logout"
        >
          <span class="icon is-small">
            <i class="fas fa-sign-out-alt" />
          </span>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>
</nav>

<style>
  .item_disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
</style>
