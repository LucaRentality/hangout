// This file was previously at app/components/InterestSelector.tsx
// No changes needed to its content as it was already correct.
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface InterestSelectorProps {
  category: string
  options: string[]
  initialSelected: string[]
  onSelectionChange: (selected: string[]) => void
  isEditable: boolean
  maxSelections?: number
}

export function InterestSelector({
  category,
  options,
  initialSelected,
  onSelectionChange,
  isEditable,
  maxSelections = 5,
}: InterestSelectorProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [newItem, setNewItem] = useState("")

  const handleToggle = (option: string) => {
    if (!isEditable) return

    let newSelected: string[]
    if (selected.includes(option)) {
      newSelected = selected.filter((item) => item !== option)
    } else if (selected.length < maxSelections) {
      newSelected = [...selected, option]
    } else {
      return // Max selections reached
    }
    setSelected(newSelected)
    onSelectionChange(newSelected)
  }

  const handleAddCustom = () => {
    if (!isEditable || newItem.trim() === "" || selected.length >= maxSelections) return

    const newSelected = [...selected, newItem.trim()]
    setSelected(newSelected)
    onSelectionChange(newSelected)
    setNewItem("")
  }

  const handleRemove = (item: string) => {
    if (!isEditable) return

    const newSelected = selected.filter((i) => i !== item)
    setSelected(newSelected)
    onSelectionChange(newSelected)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((item) => (
            <Badge key={item} variant={isEditable ? "secondary" : "default"}>
              {item}
              {isEditable && (
                <Button variant="ghost" size="sm" className="ml-1 p-0" onClick={() => handleRemove(item)}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))}
        </div>
        {isEditable && (
          <div className="flex gap-2 mb-4">
            <Input
              placeholder={`Add custom ${category.toLowerCase()}`}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddCustom()}
            />
            <Button onClick={handleAddCustom} disabled={newItem.trim() === "" || selected.length >= maxSelections}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <Button
              key={option}
              variant={selected.includes(option) ? "default" : "outline"}
              onClick={() => handleToggle(option)}
              className="text-sm"
              disabled={!isEditable || (selected.length >= maxSelections && !selected.includes(option))}
            >
              {option}
            </Button>
          ))}
        </div>
        {selected.length >= maxSelections && (
          <p className="mt-2 text-sm text-muted-foreground">Maximum of {maxSelections} selections reached.</p>
        )}
      </CardContent>
    </Card>
  )
}
