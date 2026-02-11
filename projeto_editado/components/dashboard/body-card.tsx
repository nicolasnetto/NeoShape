
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BodyCard(){
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Medidas Corporais (Controle Realista)</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Input placeholder="Peito (cm)" />
        <Input placeholder="Cintura (cm)" />
        <Input placeholder="Quadril (cm)" />
        <Input placeholder="Bíceps (cm)" />
        <Input placeholder="Antebraço (cm)" />
        <Input placeholder="Coxa (cm)" />
        <Input placeholder="Panturrilha (cm)" />
        <Input placeholder="Ombro (cm)" />
      </CardContent>
    </Card>
  )
}
