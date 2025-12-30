nilai = int(input("masukkan nilai:"))
print(f"\nNilai anda: (nilai)")

if nilai >= 90:
    print("anda lulus dan mendapatkan A+ !!")
elif nilai >= 70:
    print("selamat, anda dapat A !")
elif nilai >= 50:
    print("Anda dapat B")
elif nilai >= 30:
    print("nilai anda C")
else:
    print("anda gagal..")