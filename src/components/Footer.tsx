import React from 'react';

interface FooterProps {
  onSelectRoute?: (route: string) => void;
  onOpenHelp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRoute, onOpenHelp }) => {
  return (
    <footer className="w-full bg-[#f2f4f6] mt-16 border-t border-[#e0e3e5]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          
          {/* Brand & Security Credentials */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="RotaStay Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA99c2RtZGKTI3dXdJb1oUWFoKwJu8Cnj-aGUw7xqWTZfTDKZ6B_wyXdZxPDH3TJ40fEy3Avnc0-zJOgXspoCzPLfoMJhzPmhqWQz67mI2X5vNYI-W_5VzDj_GIwKUwb-2gyVesWXDRjnnvoLT2oFdkpWd79_TqsYy68t2RjPRcsncJSRs7bkQtnbTLljMjMLnrSss1aQHyRaEmrJpUx_V18VZFF84FB5FycOSkEX-LUqy6l8KUZzOW"
              />
              <span className="font-bold text-[20px] text-[#191c1e]">RotaStay</span>
            </div>
            
            <p className="text-[14px] text-[#45464d] max-w-sm leading-relaxed">
              Türkiye'nin seçkin butik, resort ve şehir otellerinde güvenilir rezervasyon deneyimi.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-[#45464d]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eceef0] text-[12px] font-semibold text-[#191c1e]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">
                  verified_user
                </span>
                TÜRSAB Lisanslı
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eceef0] text-[12px] font-semibold text-[#191c1e]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">lock</span>
                256-bit SSL
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eceef0] text-[12px] font-semibold text-[#191c1e]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">
                  credit_card
                </span>
                3D Secure
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[14px] text-[#191c1e]">Hızlı Erişim</h4>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onOpenHelp?.();
              }}
              className="text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Hakkımızda
            </a>
            <a
              href="#how-it-works"
              className="text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Nasıl Çalışır?
            </a>
            <a
              href="#careers"
              onClick={(e) => {
                e.preventDefault();
                onOpenHelp?.();
              }}
              className="text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Kariyer
            </a>
            <a
              href="#sustainability"
              onClick={(e) => {
                e.preventDefault();
                onOpenHelp?.();
              }}
              className="text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Sürdürülebilirlik
            </a>
          </div>

          {/* Popular Routes */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[14px] text-[#191c1e]">Popüler Rotalar</h4>
            <button
              onClick={() => onSelectRoute?.('Antalya')}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Antalya Otelleri
            </button>
            <button
              onClick={() => onSelectRoute?.('Bodrum')}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Bodrum Otelleri
            </button>
            <button
              onClick={() => onSelectRoute?.('Kapadokya')}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Kapadokya Mağara Otelleri
            </button>
            <button
              onClick={() => onSelectRoute?.('Çeşme')}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Çeşme & Alaçatı
            </button>
          </div>

          {/* Support & Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[14px] text-[#191c1e]">Destek & Koşullar</h4>
            <button
              onClick={onOpenHelp}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Sıkça Sorulan Sorular
            </button>
            <button
              onClick={onOpenHelp}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              İptal ve İade Koşulları
            </button>
            <button
              onClick={onOpenHelp}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Gizlilik Politikası
            </button>
            <button
              onClick={onOpenHelp}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              Kullanım Koşulları
            </button>
            <button
              onClick={onOpenHelp}
              className="text-left text-[14px] text-[#45464d] hover:text-[#006591] transition-colors"
            >
              İletişim
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#e0e3e5] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#45464d]">
            © 2025 RotaStay Turizm A.Ş. Tüm hakları saklıdır.
          </p>
          <p className="text-[13px] text-[#45464d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#006591]">shield</span>
            Güvenli Tatil & Şeffaf Fiyatlandırma Standardı
          </p>
        </div>
      </div>
    </footer>
  );
};
