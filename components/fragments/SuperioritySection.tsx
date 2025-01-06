export default function Superiority() {
  return (
    <section className="w-full py-12 bg-[#FDF6EC]">
  <div className="container px-4 mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-secondary mb-2">Kenapa Pilih Askha Jaya?</h2>
      <p className="text-secondary/80">
        Temukan kelezatan kami di sini dan rasakan sendiri kenikmatannya!
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Card 1 */}
         <div>
           <h3>Rasa Otentik</h3>
           <p>Cita rasa asli kripik Lampung yang tak tertanding.</p>
         </div>
         {/* Card 2 */}
         <div>
           <h3>Bahan Berkualitas</h3>
           <p>Hanya menggunakan bahan segar dari alam Lampung.</p>
         </div>
         {/* Card 3 */}
         <div>
           <h3>Cocok untuk Segala Momen</h3>
           <p>Camilan nikmat untuk setiap momen hingga hadiah spesial.</p>
         </div>
    </div>
  </div>
</section>

  )
}
