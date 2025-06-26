"use client";

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/elements/button"
import { Input } from "@/components/elements/input"
import { Label } from "@/components/elements/label"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/elements/card";

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="pt-24 pb-8 flex items-center justify-center bg-[#FDF6EC] p-4 min-h-[calc(100vh-64px)]">
            <Card className="w-full max-w-md bg-primary shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-secondary">Buat Akun Baru</CardTitle>
                    <CardDescription className="text-[#8B5D3B]/80">Daftar Sebagai Admin di Askha Jaya</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-secondary">
                                Nama Lengkap
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-[#8B5D3B]/50" />
                                <Input
                                    id="name"
                                    placeholder="Masukkan nama lengkap"
                                    type="text"
                                    className="pl-10 bg-white/90 border-[#8B5D3B]/20 focus:border-[#8B5D3B] text-[#8B5D3B]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-secondary">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-[#8B5D3B]/50" />
                                <Input
                                    id="email"
                                    placeholder="nama@email.com"
                                    type="email"
                                    className="pl-10 bg-white/90 border-[#8B5D3B]/20 focus:border-[#8B5D3B] text-[#8B5D3B]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-secondary">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-[#8B5D3B]/50" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="pl-10 pr-10 bg-white/90 border-[#8B5D3B]/20 focus:border-[#8B5D3B] text-[#8B5D3B]"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-[#8B5D3B]/50 hover:text-[#8B5D3B]"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-secondary">
                                Konfirmasi Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-[#8B5D3B]/50" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="pl-10 pr-10 bg-white/90 border-[#8B5D3B]/20 focus:border-[#8B5D3B] text-[#8B5D3B]"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-[#8B5D3B]/50 hover:text-[#8B5D3B]"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <input type="checkbox" id="terms" className="rounded border-[#8B5D3B]/20" required />
                            <Label htmlFor="terms" className="text-secondary">
                                Saya setuju dengan{" "}
                                <a href="#" className="font-semibold hover:underline">
                                    Syarat & Ketentuan
                                </a>{" "}
                                dan{" "}
                                <a href="#" className="font-semibold hover:underline">
                                    Kebijakan Privasi
                                </a>
                            </Label>
                        </div>

                        <Button type="submit" className="w-full bg-[#8B5D3B] hover:bg-[#8B5D3B]/90 text-white">
                            Daftar Sekarang
                        </Button>

                        <div className="text-center text-sm text-secondary">
                            Sudah punya akun?{" "}
                            <a href="/login" className="font-semibold hover:underline">
                                Masuk di sini
                            </a>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
