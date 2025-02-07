//* ======================================================
//*                     IOS CALCULATOR
//* ======================================================

const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalButtons = document.querySelector(".equal");
const ustEkranDiv = document.querySelector(".previous-display");

const altEkranDiv = document.querySelector(".current-display");
let ustEkranSayi = "";
let altEkranSayi = "";
let islem = "";

//?*********** herhangi bir number a basılınca

numberButtons.forEach((number) => {
  number.onclick = () => {
    //!ekranı hazırla

  ekranaHazirlik(number.textContent)


    updateEkran();
  };
});




//!EKRANA HAZIRLIK

const ekranaHazirlik = (number) => {
  // //?kullanıcı 0 girerse, sonrasında 0 ve . dışında bir sayı girerse, ekranda sadece girilen yeni sayı (0 iptal olsun) gözüksün sadece 7 gözüksün mesela, altEkranYazi = num; bunu yap ama son basımı iptal et return
  if (altEkranSayi == "0" && number != "0" && number != ".") {
    altEkranSayi = number;
    //! bu döngüden çık bu işini globaldeki değişkeni değiştirerek bitirdi ama bişey döndürmeyecek, daha önceki 0 ı da yok sayacak
    return;
  }

  //?kullanıcı herhangi bir yerde . girmişken, tekrar nokta girmeye kalkarsa giremesin

  if (number == "." && altEkranSayi.includes(".")) return;

  // //?kullanıcı 10 haneden sonra girmesin

    if(altEkranSayi.length > 9) return

  //?kullanıcı ilk başta 0 girer ardından tekrar 0 girerse, girilmesin, tek 0 döndürsün

  if (altEkranSayi === "0" && number === "0") return;

 

  //?bütün şartları başarı ile geçtiyse basılan numaraları arka arkaya ekle
  altEkranSayi += number;
};


//!BURADA YAPILANLARI EKRANA BASTIR

const updateEkran = () => {
  //?ilk sayılar altekranda görünsün
  altEkranDiv.textContent = altEkranSayi;

  //?işlem girilince
  // üstekranda altta yazan rakam + işlem gözükmeli

  if (islem) {
    ustEkranDiv.textContent = ustEkranSayi + " " + islem;
  } else {
    ustEkranDiv.textContent = "";
  }
};
//?**************HERHANGİ BİR İŞLEME TIKLANDIĞINDA

operationButtons.forEach((op) => {
  op.onclick = () => {
    //?altekran boşken, hiçbir şekilde sayı girişi yapılmamışsa, operatöre basılmasın. boş return yapmaya çalıştığınız işlemi yaptırmaz.
    //? return fonksiyon içerisinde her yerde kullanılabilir. Kod return satırına eriştiğinde fonksiyon durur ve değer fonksiyonun çağırıldığı yere geri gönderilir. Bir fonksiyon içerisinde birden fazla return fonksiyonu da olabilir. return değer döndürmek zorunda değildir.

    if (altEkranSayi === "") return;

    //?arka arkaya işlem yapılırsa (eşittire basmadan hesaplama yapılsın)
    if (altEkranSayi && ustEkranSayi) hesapla();

    islem = op.textContent;

    ustEkranSayi = altEkranSayi;

    altEkranSayi = "";

    updateEkran();
  };
});
//?**************eşittir butonuna tıklandığında

equalButtons.onclick = () => {
  hesapla();

  updateEkran();
};

//! HESAPLA FONKSİYONU

const hesapla = () => {
  let sonuc;
  switch (islem) {
    case "+":
      sonuc = Number(ustEkranSayi) + Number(altEkranSayi);
      break;
    case "-":
      sonuc = ustEkranSayi - altEkranSayi;
      break;
    case "x":
      sonuc = ustEkranSayi * altEkranSayi;
      break;
    case "÷":
      sonuc = ustEkranSayi / altEkranSayi;
      break;
    default:
      break;
  }

  // hesaplama yapıldıktan sonra ekranda olmasını istediklerimi vs code da güncelleyip updateEkran() ı çağırmalıyım
  altEkranSayi = sonuc;
  ustEkranSayi = "";
  islem = "";
};

//?AC butonuna basıldığında
document.querySelector(".ac").onclick = () => {
  ustEkranSayi = "";
  altEkranSayi = "";
  islem = "";
  updateEkran();
};

//? PM butonuna basıldığında
document.querySelector(".pm").onclick = () => {
  //? ekranda sayı yokken pm e basılmasın

  if (altEkranSayi !== "") {
    altEkranSayi = altEkranSayi * -1;

    updateEkran();
  }
};

//?percent % butonuna basıldığında
document.querySelector(".percent").onclick = () => {

  if(altEkranSayi!=="")

  {altEkranSayi=altEkranSayi/100
  updateEkran()}
};