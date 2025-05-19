// import next response and request
import { NextRequest, NextResponse } from "next/server";

// import prisma client
import  prisma from "@/prisma/client";




// Service DELETE data user
export const DELETE = async (request: NextRequest, {params}: {params: {id: string}}) => {
  // cek apakah data user ada 
  const checkUser = await prisma.user.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  // jika data tidak ditemukan
  if (!checkUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Data User Tidak Ada!",
      },
      {
        status: 404,
      },
    )
  }

  // proses delete data
  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(params.id),
    },
  })

  // return response json DELETE
  return NextResponse.json(
    {
      success: true,
      message: "Data User Berhasil di Hapus!",
    },
    {
      status: 200,
    }
  )

}
