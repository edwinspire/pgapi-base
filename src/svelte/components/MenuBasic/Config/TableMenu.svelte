<script>
  import { onMount } from "svelte";
  import { ColumnTypes, Table } from "@edwinspire/svelte-component-table/src";

  let ColumnsEndPoints = {
    idbasicmenu: { hidden: true },
    ts: { hidden: true },
    ispublic: {
      label: "Público",
      decorator: {
        component: ColumnTypes.Boolean,
      },
    },
    enabled: {
      label: "Habilitado",
        decorator: {
        component: ColumnTypes.Boolean,
      },
    },
    visible: {
      label: "Visible",
      decorator: {
        component: ColumnTypes.Boolean,
      },
    },
    dateevent: {
      label: "Fecha",
      decorator: {
        component: ColumnTypes.DateTime,
        props: { highlight_isnt_today: true },
      },
    },
    account_name: { label: "Cliente" },
  };

  function HandleSelectEditMenu(ev) {
    //console.log(ev.detail);
    EndPointSelected = ev.detail.data;
    showEnpointForm = true;
  }

  function HandleOnNewMenu(e) {
    EndPointSelected = {};
    EndPointSelected.idendpoint = -1;
    EndPointSelected.endpoint = "";
    EndPointSelected.enabled = true;
    EndPointSelected.note = "";
    showEnpointForm = true;
    console.log(EndPointSelected, showEnpointForm);
  }

  onMount(async () => {});
</script>

<Table
  url="/pgapi_v1/admin/gui/menu"
  columns={ColumnsEndPoints}
  ShowEditButton="true"
  on:editrow={HandleSelectEditMenu}
  on:newrow={HandleOnNewMenu}
>
  <span slot="title">
    <b>GUI - Menu</b>
  </span>
</Table>
