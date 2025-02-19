import { Search } from "lucide-react"

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-[600px]">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full bg-[#202327] py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:bg-black focus:ring-1 focus:ring-[#1d9bf0]"
      />
    </div>
  )
}

