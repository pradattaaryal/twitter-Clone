import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export default function PremiumCard() {
  return (
    <Card className="bg-black text-white border-none max-w-[380px]">
      <CardHeader>
        <h2 className="text-xl font-bold">Subscribbbe to Premium</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
          <Link href={`/comming`}>
        <Button className="w-fit bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white rounded-full font-bold px-6">
          Subscribe
        </Button></Link>
      </CardContent>
    </Card>
  )
}

