export default function DropList({ scrolled }: { scrolled: boolean }) {
    return (
      <ul id="dropdown" className={`navbar-drop-list hidden shadow absolute top-full left-0 w-full rounded-md  ${scrolled ? "bg-white text-gray-800" : "bg-white text-gray-800"} overflow-hidden`}>
        <li className="hover:bg-gray-300 hover:pl-4 transition-all p-2">List Item</li>
        <li className="hover:bg-gray-300 hover:pl-4 transition-all p-2">List Item</li>
        <li className="hover:bg-gray-300 hover:pl-4 transition-all p-2">List Item</li>
        <li className="hover:bg-gray-300 hover:pl-4 transition-all p-2">List Item</li>
      </ul>
    )
}