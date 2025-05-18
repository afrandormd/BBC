// import next and request response
import { NextRequest, NextResponse } from "next/server";

// import helpers prisma client
import prisma from "@/prisma/client";

// service GET detail data
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    // get params id
    const params = await props.params

    // cek apakah id ada atau tidak
    const product = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      }
    })

    // jika data produk tidak ditemukan
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Data Produk Tidak Ditemukan!"
        },
        {
          status: 404,
        }
      )
    }

    // jika data produk ditemukan -> response json
    return NextResponse.json(
      {
        success: true,
        message: "Detail Data Produk",
        data: product,
      },
      {
        status: 200,
      }
    )
    
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Parameter slug harus angka !",
      },
      {
        status: 400,
      }
    ) 
  }

}

