export const getFileType = (path: any) => {
  const extension = path.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image';
    case 'pdf':
      return 'pdf';
    case 'doc':
    case 'docx':
      return 'word';
    case 'xlsx':
      return 'excel';
    // ...
    default:
      return 'unknown';
  }
};

export const getIcon = (fileType: string) => {
  switch (fileType) {
    case 'image':
      return 'ic:outline-image'; // مسیر آیکون برای تصاویر
    case 'pdf':
      return 'teenyicons:pdf-outline'; // مسیر آیکون برای فایل‌های PDF
    case 'word':
      return 'teenyicons:ms-word-outline'; // مسیر آیکون برای فایل‌های Word
    default:
      return 'ant-design:file-unknown-outlined'; // آیکون پیش‌فرض برای فایل‌های ناشناخته
  }
};

export const getFileSvg = (fileType: string) => {
  switch (fileType) {
    case 'image':
      return '/assets/icons/files/ic_img.svg'; // مسیر آیکون برای تصاویر
    case 'pdf':
      return '/assets/icons/files/ic_pdf.svg'; // مسیر آیکون برای فایل‌های PDF
    case 'word':
      return '/assets/icons/files/ic_word.svg'; // مسیر آیکون برای فایل‌های Word
    case 'excel':
      return '/assets/icons/files/ic_excel.svg'; // مسیر آیکون برای فایل‌های Word
    default:
      return '/assets/icons/files/ic_file.svg'; // آیکون پیش‌فرض برای فایل‌های ناشناخته
  }
};
