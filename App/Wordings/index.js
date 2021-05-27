import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    DoYouHave: 'Apakah kamu memiliki',
    PmtAccount: 'Rekening PermataBank',
    PMobXAcc: 'User ID PermataMobile X ?',
    OnBoardingTitle1: 'Halo',
    OnBoardingDescription1:
      'Selamat datang di perbankan terkini dengan PermataMobile X',
    OnBoardingTitle2: 'Mudah, Cepat dan Dapat Diandalkan.',
    OnBoardingDescription2:
      'Nikmati berbagai transaksi perbankan dalam satu genggaman',
    OnBoardingTitle3: 'Nikmati Cashback hingga 30%',
    OnBoardingDescription3:
      'Dapatkan Cashback dari berbagai toko online, bioskop, dan lainya',
    yes: 'Ya',
    no: 'Tidak',
    askUserId: 'Silahkan masukkan User ID kamu',
    askPassword: 'Silahkan masukkan password',
    userIdPlaceHolder: 'Masukkan User ID',
    passwordPlaceHolder: 'Masukkan Password',
    forgotPassword: 'Saya lupa User ID atau password',
    next: 'Lanjut',
    login: 'Masuk',
    changeCaptcha: 'Ganti Kode',
    captchaDescription:
      'Untuk memastikan bahwa kamu bukan robot, masukkan kode Captcha:',
    captchaPlaceHolder: 'Masukkan Captcha',
    PermataStoreNew: 'Yang Terbaru',
    inActiveText: 'Tidak ada aktivitas',
    remainingTime: 'Sisa waktu',
    timeout:
      'Kamu akan keluar secara otomatis dari PermataMobile X jika tidak aktif dalam jangka waktu tertentu',
    resetTimer: 'Tambah waktu saya',
  },
  id: {
    DoYouHave: 'Do you have',
    PmtAccount: 'PermataBank Account',
    PMobXAcc: "PermataMobile X's User ID ?",
    OnBoardingTitle1: 'Hello',
    OnBoardingDescription1:
      '(pura" inggris Selamat datang di perbankan terkini dengan PermataMobile X)',
    OnBoardingTitle2: 'Simple, Fast and Reliable',
    OnBoardingDescription2:
      '(pura" englishNikmati berbagai transaksi perbankan dalam satu genggaman)',
    OnBoardingTitle3: 'Enjoy up to 30% Cashback',
    OnBoardingDescription3:
      '(pura" english Dapatkan Cashback dari berbagai toko online, bioskop, dan lainya',
    yes: 'Yes',
    no: 'No',
    askUserId: 'Please enter your User ID',
    askPassword: 'Please enter your Password',
    userIdPlaceHolder: 'Masukkan User ID',
    passwordPlaceHolder: 'Enter your password',
    forgotPassword: 'I forgot my username and password',
    next: 'Next',
    login: 'Login',
    changeCaptcha: 'Change Code',
    captchaDescription:
      'To ensure that you are not robot. please enter Captcha code:',
    captchaPlaceHolder: 'Enter Captcha',
    PermataStoreNew: 'Hot Items',
    inActiveText: 'No activity',
    remainingTime: 'Times remaining',
    timeout:
      'Kamu akan keluar secara otomatis dari PermataMobile X jika tidak aktif dalam jangka waktu tertentu',
    resetTimer: 'Add more time',
  },
};

export default new LocalizedStrings(translations);
