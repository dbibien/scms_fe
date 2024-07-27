import { useState } from "react"

const HouseNote = ({ note }: { note: string }) => {
  const [showFullNote, setShowFullNote] = useState(false)

  const noteClean = note.replace("<p>", "").replace("</p>", "")

  return (
    <div className="">
      <p className="text-sm underline text-slate-500">Note:</p>
      <div>
        <p>{showFullNote ? noteClean : noteClean.length > 30 ? `${noteClean.slice(0, 30)}... ` : noteClean}
          {noteClean.length > 30 && (
            <button
              onClick={() => setShowFullNote(!showFullNote)}
              className="pl-1 text-blue-300"
            >
              {showFullNote ? `show less` : `show more`}
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

export default HouseNote
