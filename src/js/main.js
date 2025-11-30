// ==========================================================
//  Arreglo de pedidos
// ==========================================================
let pedidos = [];

// ==========================================================
//  Funcion para mostrar la tabla principal
// ==========================================================
function mostrarTabla(data = pedidos) {
    const tbody = document.getElementById("tablaPedidos");
    tbody.innerHTML = "";

    data.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.mesa}</td>
                <td>${p.mesero}</td>
                <td>$${p.total}</td>
                <td class="${p.pagado ? 'pagado' : 'nopagado'}">
                    ${p.pagado ? "Pagado" : "No Pagado"}
                </td>
                <td>
                    <button class="btn btn-danger btn-sm"
                        onclick="eliminarPedido(${p.id})">Eliminar</button>
                </td>
            </tr>`;
    });

    calcularTotales();
}

// ==========================================================
//  Agregar pedido 
// ==========================================================
document.getElementById("formPedido").addEventListener("submit", (e) => {
    e.preventDefault();

    const mesa = Number(document.getElementById("mesa").value);
    const mesero = document.getElementById("mesero").value;
    const total = Number(document.getElementById("total").value);
    const pagado = document.getElementById("pagado").value === "true";

    if (total <= 0) {
        alert("El total debe ser mayor a 0.");
        return;
    }

    const nuevoPedido = {
        id: pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1,
        mesa,
        mesero,
        total,
        pagado
    };

    pedidos.push(nuevoPedido);

    mostrarTabla();
    e.target.reset();
});

// ==========================================================
//   Funcion para eliminar el pedido
// ==========================================================
function eliminarPedido(id) {
    pedidos = pedidos.filter(p => p.id !== id);
    mostrarTabla();
}

// ==========================================================
//    Funcion para buscar los pedidos por mesa
// ==========================================================
function buscarPorMesa() {
    const mesa = Number(document.getElementById("buscarMesa").value);
    const resultados = pedidos.filter(p => p.mesa === mesa);

    const ul = document.getElementById("resultadoBusqueda");
    ul.innerHTML = "";

    resultados.forEach(r => {
        ul.innerHTML += `<li>Pedido ID ${r.id} - Total $${r.total}</li>`;
    });

    if (resultados.length === 0) {
        ul.innerHTML = "<li>No hay pedidos para esa mesa</li>";
    }
}

// ==========================================================
//    Funcion para mostrar los pedidos pagados
// ==========================================================
function mostrarPagados() {
    mostrarTabla(pedidos.filter(p => p.pagado));
}

// ==========================================================
//    Funcion para mostrar los pedidos no pagados
// ==========================================================
function mostrarNoPagados() {
    mostrarTabla(pedidos.filter(p => !p.pagado));
}

// ==========================================================
//    Funcion para mostrar los pedidos ordenados por el total
// ==========================================================
function ordenarPorTotal() {
    const ordenados = [...pedidos].sort((a, b) => b.total - a.total);
    mostrarTabla(ordenados);
}

// ==========================================================
//   Funcion para calcular los totales
// ==========================================================
function calcularTotales() {
    const pagados = pedidos.filter(p => p.pagado);

    const totalVend = pagados.reduce((ac, p) => ac + p.total, 0);
    const promedio = pagados.length
        ? (totalVend / pagados.length).toFixed(2)
        : 0;

    document.getElementById("totalVendido").textContent = totalVend;
    document.getElementById("ticketPromedio").textContent = promedio;
}
//==========================================================
// Inicializa tabla vacía al cargar
//==========================================================
mostrarTabla();
