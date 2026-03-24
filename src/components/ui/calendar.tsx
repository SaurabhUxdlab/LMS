import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  value?: string
  onChange?: (date: string) => void
  className?: string
}

export function Calendar({ value, onChange, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(() => {
    if (value) {
      const parts = value.split("-")
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
      }
    }
    return null
  })

  const daysInMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.year, currentDate.month, 1).getDay()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const handlePrevMonth = () => {
    setCurrentDate(prev => ({
      year: prev.month === 0 ? prev.year - 1 : prev.year,
      month: prev.month === 0 ? 11 : prev.month - 1
    }))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => ({
      year: prev.month === 11 ? prev.year + 1 : prev.year,
      month: prev.month === 11 ? 0 : prev.month + 1
    }))
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.year, currentDate.month, day)
    setSelectedDate(newDate)
    const dateString = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`
    onChange?.(dateString)
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.month &&
      selectedDate.getFullYear() === currentDate.year
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.month &&
      today.getFullYear() === currentDate.year
    )
  }

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={handlePrevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {monthNames[currentDate.month]} {currentDate.year}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysArray.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={cn(
              "h-8 w-8 rounded-md text-sm transition-colors",
              isSelected(day)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : isToday(day)
                ? "bg-accent hover:bg-accent/80"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
