import clsx from "clsx";

/**
 * TableRow
 * ------------
 * Componente base para las filas (<tr>) de las tablas del sistema.
 *
 * Props:
 * - index: número de fila (para alternar colores pares/impares)
 * - onDoubleClick?: función al hacer doble clic (por ejemplo, editar)
 * - hover?: boolean → activa efecto hover (default: true)
 * - cursor?: boolean → fuerza mostrar cursor pointer (por defecto depende de onDoubleClick)
 * - className?: string → estilos extra opcionales
 * - children: contenido de las celdas (<td>...</td>)
 */
export default function TableRow({
  index = 0,
  onDoubleClick,
  hover = true,
  cursor,
  className,
  children,
}) {
  const showCursor = cursor ?? Boolean(onDoubleClick);

  return (
    <tr
      onDoubleClick={onDoubleClick}
      className={clsx(
        index % 2 === 0
          ? "bg-[var(--active-bg)] dark:bg-[var(--active-bg)]"
          : "bg-[var(--card)] dark:bg-[var(--card)]",

        hover &&
          "hover:bg-[var(--hover-surface)] dark:hover:bg-[var(--hover-surface)]",

        "transition-colors duration-150 relative",
        showCursor && "cursor-pointer",

        className
      )}
    >
      {children}
    </tr>
  );
}
