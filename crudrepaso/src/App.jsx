import React, { useState, useEffect } from 'react';

const App = () => {
  const datosIniciales = [
    { id: 1, nombre: "Mach Speeder", precio: 8.50, stock: 90 },
    { id: 2, nombre: "67 Chevy C10 TM GM", precio: 15, stock: 25 },
    { id: 3, nombre: "BMW M4", precio: 6, stock: 140 }
  ];

  const [productos, setProductos] = useState(() => {
    const datosGuardados = localStorage.getItem('productos');
    return datosGuardados ? JSON.parse(datosGuardados) : datosIniciales;
  });

  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '', stock: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) return;
    const nuevo = {
      id: Date.now(),
      nombre: nuevoProducto.nombre,
      precio: parseFloat(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock)
    };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ nombre: '', precio: '', stock: '' });
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const eliminarTodos = () => {
    setProductos([]);
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setNuevoProducto({ nombre: producto.nombre, precio: producto.precio, stock: producto.stock });
  };

  const guardarEdicion = () => {
    setProductos(productos.map(p =>
      p.id === editandoId ? {
        ...p,
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio),
        stock: parseInt(nuevoProducto.stock)
      } : p
    ));
    setEditandoId(null);
    setNuevoProducto({ nombre: '', precio: '', stock: '' });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inventario de Autos HotWheels</h1>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          placeholder="Modelo"
          className="border p-2"
        />
        <input
          name="precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          type="number"
          placeholder="Precio"
          className="border p-2"
        />
        <input
          name="stock"
          value={nuevoProducto.stock}
          onChange={handleChange}
          type="number"
          placeholder="Stock"
          className="border p-2"
        />
      </div>

      {editandoId ? (
        <button onClick={guardarEdicion} className="bg-blue-500 text-white px-4 py-2 mr-2">Guardar</button>
      ) : (
        <button onClick={agregarProducto} className="bg-green-500 text-white px-4 py-2 mr-2">Agregar</button>
      )}
      <button onClick={eliminarTodos} className="bg-red-500 text-white px-4 py-2">Eliminar Todos</button>

      <ul className="mt-6">
        {productos.map(p => (
          <li key={p.id} className="border p-3 mb-2 flex justify-between items-center">
            <span>{p.nombre} - ${p.precio} - Stock: {p.stock}</span>
            <div>
              <button onClick={() => iniciarEdicion(p)} className="bg-yellow-400 px-3 py-1 mr-2">Editar</button>
              <button onClick={() => eliminarProducto(p.id)} className="bg-red-400 px-3 py-1">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
