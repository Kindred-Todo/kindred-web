import { SheetTrigger } from '@/components/ui/sheet'

export default function TopNav() {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-end md:justify-between px-4 md:px-12 py-6 md:py-8">
      <div className="hidden md:block font-outfit font-light text-lg md:text-[1.36vw] text-white tracking-[-0.8px]">
        kindred
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="font-outfit font-light text-lg md:text-[1.36vw] text-[#13121f] px-4 md:px-6 py-2 md:py-3 rounded-[40px] cursor-pointer hover:bg-gray-50 transition-colors">
          about
        </div>
        <SheetTrigger asChild>
          <button className="font-outfit font-light text-lg md:text-[1.36vw] text-[#13121f] px-4 md:px-6 py-2 md:py-3 rounded-[40px] border border-black hover:bg-gray-50 transition-colors">
            coming soon
          </button>
        </SheetTrigger>
      </div>
    </div>
  )
}
