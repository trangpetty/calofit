import React from 'react';
import {
    CaretRight,
    InstagramLogo,
    FacebookLogo,
    YoutubeLogo,
    LinkedinLogo,
    XLogo,
    TiktokLogo
} from '@phosphor-icons/react';

export default function Footer() {
    // Dữ liệu cho các cột Links giúp code gọn gàng hơn
    const resourcesLinks = ["Premium", "Blog", "Cộng đồng", "Liên hệ", "Trung tâm hỗ trợ"];
    const companyLinks = ["Về chúng tôi", "Tuyển dụng", "Báo chí", "Quảng cáo", "Dành cho doanh nghiệp"];
    const legalLinks = ["Nguyên tắc cộng đồng", "Góp ý", "Điều khoản", "Bảo mật", "API", "Tùy chọn Cookie"];

    return (
        <footer className="bg-[#0f172a] pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Logo & CTA  */}
                    <div className="md:col-span-6 flex flex-col items-start">
                        <h2 className="text-white text-3xl font-extrabold mb-4 tracking-widest">
                            calofit<span className="text-emerald-500">.</span>
                        </h2>

                        <p className="text-slate-300 text-lg mb-8">
                            Nuôi dưỡng cơ thể, theo cách của bạn.
                        </p>

                        <button className="bg-white text-emerald-600 hover:bg-slate-50 transition-colors font-bold py-3 px-6 rounded-full flex items-center gap-2 uppercase tracking-wide text-sm">
                            Bắt đầu ngay <CaretRight size={18} weight="bold" />
                        </button>
                    </div>

                    {/* Resources */}
                    <div className="md:col-span-3">
                        <h3 className="text-white font-bold text-lg mb-6">Tài nguyên</h3>
                        <ul className="flex flex-col gap-4">
                            {resourcesLinks.map((link, index) => (
                                <li key={index}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="md:col-span-3">
                        <h3 className="text-white font-bold text-lg mb-6">Công ty</h3>
                        <ul className="flex flex-col gap-4">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* ======================================= */}
                {/* Copyright & Socials */}
                {/* ======================================= */}
                <div className="flex flex-col items-center gap-8 pt-8 border-t border-slate-800">

                    {/* Copyright & Links */}
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-slate-400 text-center">
                        <span>©{new Date().getFullYear()} Calofit, Inc.</span>
                        {legalLinks.map((link, index) => (
                            <React.Fragment key={index}>
                                <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
                                    {link}
                                </a>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0f172a] hover:bg-emerald-500 hover:text-white transition-colors">
                            <InstagramLogo size={18} weight="fill" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0f172a] hover:bg-emerald-500 hover:text-white transition-colors">
                            <FacebookLogo size={18} weight="fill" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0f172a] hover:bg-emerald-500 hover:text-white transition-colors">
                            <YoutubeLogo size={18} weight="fill" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0f172a] hover:bg-emerald-500 hover:text-white transition-colors">
                            <LinkedinLogo size={18} weight="fill" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0f172a] hover:bg-emerald-500 hover:text-white transition-colors">
                            <XLogo size={18} weight="fill" />
                        </a>
                        <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0f172a] hover:bg-emerald-500 hover:text-white transition-colors">
                            <TiktokLogo size={18} weight="fill" />
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}