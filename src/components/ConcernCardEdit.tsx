// import { Pen, Sheet } from "lucide-react"
// import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
// // import { ScrollArea } from "./ui/scroll-area"
// import { concernCardType } from "@/common/types"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
//
// // HELPER COMPONENT
// const ConcernCardEdit = ({ concern }: concernCardType) => {
//   return (
//     <Sheet>
//       <SheetTrigger className="flex gap-2 items-center text-slate-500 hover:text-black">
//         <Pen />
//         <p>Edit</p>
//       </SheetTrigger>
//
//       <SheetContent side="bottom">
//         <SheetHeader>
//           <SheetTitle className="text-center">
//             {concern?.name}
//           </SheetTitle>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   )
// }
//
//
//
// const ConcernCard = ({ concern }: concernCardType) => {
//   return (
//     <Card className="mb-4">
//       <CardHeader>
//         <CardTitle>{concern?.name}</CardTitle>
//         <CardDescription>{concern?.hint}</CardDescription>
//       </CardHeader>
//
//       <CardContent>
//         <p>{concern?.say.replace("<p>", "").replace("</p>", "")}</p>
//       </CardContent>
//
//       <CardFooter>
//         <ConcernCardEdit concern={concern} />
//       </CardFooter>
//     </Card>
//   )
// }
//
// export default ConcernCard
