import React, { useState } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQS = [
  {
    q: 'Rezervasyonumda gizli ek ücret veya vergi çıkar mı?',
    a: 'Hayır. RotaStay Şeffaf Fiyatlandırma Standardı uyarınca gördüğünüz tüm tutarlar KDV, konaklama vergisi ve hizmet bedelleri dahil nihai toplam fiyattır. Otele varışta sürpriz bir ücret ödemezsiniz.',
  },
  {
    q: 'Ücretsiz iptal ve iade koşulları nasıl işler?',
    a: 'Ücretsiz iptal rozetine sahip tüm rezervasyonlarda, otele giriş gününden 48 veya 72 saat öncesine kadar (tesis kuralına göre) tek tıkla kesintisiz tam iade alabilirsiniz.',
  },
  {
    q: 'RotaStay TÜRSAB güvencesi var mı?',
    a: 'Evet. RotaStay Turizm A.Ş., Türkiye Seyahat Acentaları Birliği (TÜRSAB) A Grubu Acente Belgesi (Belge No: A-12490) lisansına sahiptir. Tüm ödemeler BDDK onaylı lisanslı Türk banka altyapısıyla 256-bit SSL ve 3D Secure ile korunur.',
  },
  {
    q: 'Rezervasyon belgeme ve voucherıma nasıl ulaşırım?',
    a: 'Rezervasyon onaylandığı an SMS ve e-posta ile anında iletilir. Ayrıca sağ üstteki profilinizden "Rezervasyonlarım" sekmesinden istediğiniz zaman görüntüleyebilir ve PDF olarak indirebilirsiniz.',
  },
];

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#eceef0] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceef0] bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#006591]">
              help_center
            </span>
            <h3 className="font-bold text-[18px] text-[#191c1e]">Yardım & Destek Merkezi</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] flex items-center justify-center text-[#191c1e] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          {/* TÜRSAB Verification Card */}
          <div className="p-4 rounded-xl bg-[#c9e6ff]/30 border border-[#89ceff]/60 flex items-start gap-3.5">
            <span className="material-symbols-outlined text-[28px] text-[#006591] shrink-0 mt-0.5">
              verified_user
            </span>
            <div>
              <h4 className="font-bold text-[15px] text-[#001e2f]">
                TÜRSAB A Grubu Lisanslı Seyahat Platformu
              </h4>
              <p className="text-[13px] text-[#004c6e] mt-0.5">
                Belge No: <strong>A-12490</strong> · T.C. Kültür ve Turizm Bakanlığı denetimli, yasal seyahat acentesi güvencesiyle tatilinizi güvenle planlayın.
              </p>
            </div>
          </div>

          {/* Contact Direct Hotlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-[#eceef0] bg-[#f7f9fb] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eceef0] flex items-center justify-center text-[#006591]">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#76777d] block">
                  7/24 Çağrı Merkezi
                </span>
                <span className="text-[14px] font-bold text-[#191c1e]">0850 300 76 82</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#eceef0] bg-[#f7f9fb] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#10b981]/15 flex items-center justify-center text-[#10b981]">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#76777d] block">
                  WhatsApp Canlı Destek
                </span>
                <span className="text-[14px] font-bold text-[#191c1e]">+90 532 100 76 82</span>
              </div>
            </div>
          </div>

          {/* Sıkça Sorulan Sorular Accordion */}
          <div>
            <h4 className="font-bold text-[16px] text-[#191c1e] mb-3">
              Sıkça Sorulan Sorular
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-[#eceef0] rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-[14px] text-[#191c1e] flex items-center justify-between hover:bg-[#f7f9fb] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-[20px] text-[#76777d]">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-[13px] text-[#45464d] leading-relaxed border-t border-[#f2f4f6] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
