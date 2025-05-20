// export default function Footer() {
//   return (
//     <footer className="w-full bg-dark-bg px-4 md:px-12 py-8 mt-auto text-light-bg">
//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-12 md:col-span-4 mb-6 md:mb-0">
//           <div className="text-xl font-medium mb-4">kindred</div>
//           <p className="text-sm opacity-70">
//             Connect with like-minded individuals and build meaningful
//             relationships.
//           </p>
//         </div>

//         <div className="col-span-6 md:col-span-2">
//           <h3 className="text-md font-medium mb-4">Links</h3>
//           <ul className="space-y-2">
//             <li className="text-sm opacity-70 hover:opacity-100 transition-opacity">
//               <a href="/">Home</a>
//             </li>
//             <li className="text-sm opacity-70 hover:opacity-100 transition-opacity">
//               <a href="/about">About</a>
//             </li>
//             <li className="text-sm opacity-70 hover:opacity-100 transition-opacity">
//               <a href="/contact">Contact</a>
//             </li>
//           </ul>
//         </div>

//         <div className="col-span-6 md:col-span-2">
//           <h3 className="text-md font-medium mb-4">Legal</h3>
//           <ul className="space-y-2">
//             <li className="text-sm opacity-70 hover:opacity-100 transition-opacity">
//               <a href="/privacy">Privacy Policy</a>
//             </li>
//             <li className="text-sm opacity-70 hover:opacity-100 transition-opacity">
//               <a href="/terms">Terms of Service</a>
//             </li>
//           </ul>
//         </div>

//         <div className="col-span-12 md:col-span-4">
//           <h3 className="text-md font-medium mb-4">Stay Connected</h3>
//           <div className="flex space-x-4">
//             <a
//               href="#"
//               className="opacity-70 hover:opacity-100 transition-opacity"
//             >
//               Twitter
//             </a>
//             <a
//               href="#"
//               className="opacity-70 hover:opacity-100 transition-opacity"
//             >
//               LinkedIn
//             </a>
//             <a
//               href="#"
//               className="opacity-70 hover:opacity-100 transition-opacity"
//             >
//               Instagram
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-border mt-8 pt-6 text-center text-sm opacity-70">
//         <p>© {new Date().getFullYear()} Kindred. All rights reserved.</p>
//       </div>
//     </footer>
//   )
// }

export default function Footer() {
  return (
    <div className="w-full bg-dark-bg px-4 md:px-12 py-8 text-light-bg flex flex-row justify-between">
      <div className="text font-light mb-4 flex flex-col md:flex-row gap-2">
        Made with
        <svg
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.25 0C17.6688 0 15.4088 1.11 14 2.98625C12.5912 1.11 10.3312 0 7.75 0C5.69528 0.00231592 3.72539 0.819575 2.27248 2.27248C0.819575 3.72539 0.00231592 5.69528 0 7.75C0 16.5 12.9737 23.5825 13.5262 23.875C13.6719 23.9533 13.8346 23.9943 14 23.9943C14.1654 23.9943 14.3281 23.9533 14.4737 23.875C15.0262 23.5825 28 16.5 28 7.75C27.9977 5.69528 27.1804 3.72539 25.7275 2.27248C24.2746 0.819575 22.3047 0.00231592 20.25 0ZM14 21.85C11.7175 20.52 2 14.4612 2 7.75C2.00198 6.22561 2.60842 4.76423 3.68633 3.68633C4.76423 2.60842 6.22561 2.00198 7.75 2C10.1813 2 12.2225 3.295 13.075 5.375C13.1503 5.55841 13.2785 5.71528 13.4432 5.82569C13.6079 5.93609 13.8017 5.99503 14 5.99503C14.1983 5.99503 14.3921 5.93609 14.5568 5.82569C14.7215 5.71528 14.8497 5.55841 14.925 5.375C15.7775 3.29125 17.8187 2 20.25 2C21.7744 2.00198 23.2358 2.60842 24.3137 3.68633C25.3916 4.76423 25.998 6.22561 26 7.75C26 14.4513 16.28 20.5188 14 21.85Z"
            fill="#FF5C5F"
          />
        </svg>
      </div>
      <div className="text font-light mb-4">Contact: help@kindredtodo.com </div>
    </div>
  )
}
