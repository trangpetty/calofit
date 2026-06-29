'use client';

import HeaderLayout from "@/app/components/landing/Header";
import {
    BarbellIcon,
    BowlFood,
    BrainIcon,
    Calculator,
    CaretRightIcon,
    ChartLineUp, SparkleIcon,
    TrophyIcon, UserCircleCheckIcon, XIcon, LinkSimpleIcon, RocketLaunchIcon
} from "@phosphor-icons/react";
import Card from "@/app/components/landing/Card";
import FeatureCard from "@/app/components/landing/FeatureCard";
import {CheckIcon} from "lucide-react";
import ReviewCard from "@/app/components/landing/ReviewCard";
import PricingCard from "@/app/components/landing/PricingCard";
import FaqItem from "@/app/components/landing/FaqItem";
import {useState} from "react";
import Footer from "@/app/components/landing/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

    const stepsData = [
        {
            id: 1,
            title: "Nhập thông số — nhận kết quả ngay",
            description: "Chiều cao, cân nặng, mục tiêu → Calofit tính TDEE, BMI và macro targets chính xác theo công thức Mifflin-St Jeor. Xong trong 2 phút.",
            icon: <Calculator size={48} weight="light" />
        },
        {
            id: 2,
            title: "Log bữa ăn tiếng Việt, nhanh 10 giây",
            description: "Database có phở gà, bún bò, cơm tấm, Highlands, Phúc Long — tìm kiếm tiếng Việt ra ngay. Barcode scan cho đồ đóng gói. Không phải tự nhập từ đầu.",
            icon: <BowlFood size={48} weight="light" />
        },
        {
            id: 3,
            title: "Theo dõi tiến độ, điều chỉnh kịp thời",
            description: "Dashboard realtime, AI nhắc nhở đúng lúc, báo cáo tuần tự động. Biết mình đang ở đâu và cần làm gì tiếp theo.",
            icon: <ChartLineUp size={48} weight="light" />
        }
    ];

    const featuresData = [
        {
            id: 1,
            title: "Food database Việt",
            description: "500+ món ăn Việt, tìm bằng tiếng Việt. Barcode scan cho thực phẩm đóng gói.",
            icon: <BowlFood size={32} weight="fill" />,
            colorTheme: "green" as const
        },
        {
            id: 2,
            title: "AI coach tiếng Việt",
            description: "Chatbot gợi ý thực đơn và lịch tập cá nhân hóa theo dữ liệu của bạn.",
            icon: <BrainIcon size={32} weight="fill" />,
            colorTheme: "purple" as const
        },
        {
            id: 3,
            title: "Lịch tập thông minh",
            description: "Template Gym/HIIT/Yoga hoặc AI tạo theo BMI và mục tiêu. Timer tự động.",
            icon: <BarbellIcon size={32} weight="fill" />,
            colorTheme: "blue" as const
        },
        {
            id: 4,
            title: "Kết nối PT thật",
            description: "PT được duyệt bởi Calofit. Lịch tập riêng, chat realtime, video call 2 lần/tháng.",
            icon: <UserCircleCheckIcon size={32} weight="fill" />,
            colorTheme: "indigo" as const
        }
    ];

    const competitorFeatures = [
        "Free tier blur hầu hết data",
        "Premium $19.99/tháng (~500k VNĐ)",
        "Không có món ăn Việt",
        "Quảng cáo nặng trên free",
        "Không kết nối PT Việt Nam"
    ];

    const calofitFeatures = [
        { text: "Free tier đầy đủ, không blur", badge: "Tốt hơn" },
        { text: "Premium 99k/tháng — rẻ hơn 5x", badge: "Rẻ hơn" },
        { text: "500+ món Việt, tìm tiếng Việt", badge: "Độc quyền" },
        { text: "Không quảng cáo — không bao giờ", badge: "Clean" },
        { text: "PT Việt Nam, chat realtime", badge: "Độc quyền" }
    ];

    const reviews = [
        {
            id: 1,
            quote: "Có phở, bún bò, cơm tấm! Trước dùng MFP phải tự nhập từng món, giờ tìm là ra ngay. Giảm được 8kg sau 4 tháng.",
            initials: "MT",
            name: "Minh Tú",
            location: "TP. Hồ Chí Minh",
            avatarColor: "bg-[#dcfce7]"
        },
        {
            id: 2,
            quote: "PT giao lịch tập qua Calofit, nhìn dashboard là biết hôm nay cần làm gì. Tiện hơn nhắn Zalo nhiều.",
            initials: "HT",
            name: "Hương Trà",
            location: "Hà Nội • With PT plan",
            avatarColor: "bg-[#f3e8ff]"
        },
        {
            id: 3,
            quote: "Free tier không bị blur như MFP. Nâng Premium vì thích AI gợi ý thực đơn, không phải vì bị ép.",
            initials: "ĐA",
            name: "Đức Anh",
            location: "Đà Nẵng • Premium",
            avatarColor: "bg-[#e0f2fe]"
        }
    ];

    const plans = [
        {
            id: 1,
            title: "Free",
            titleColor: "text-emerald-600",
            price: "0đ",
            duration: "mãi mãi",
            description: "Đủ dùng để cảm nhận giá trị",
            borderColor: "border-emerald-300",
            isPopular: false,
            features: [
                { text: "Log tất cả bữa ăn", included: true },
                { text: "Tính BMI, TDEE, macro", included: true },
                { text: "Lịch sử 30 ngày", included: true },
                { text: "AI suggestions", included: false },
                { text: "Barcode scan", included: false },
            ],
            buttonText: "Bắt đầu miễn phí",
            buttonIcon: <LinkSimpleIcon size={20} weight="bold" />,
            buttonClasses: "bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-700",
            link: '/onboarding',
        },
        {
            id: 2,
            title: "Premium",
            titleColor: "text-[#a78bfa]",
            price: "99k",
            duration: "/tháng · 890k/năm",
            description: "Tự tập nghiêm túc, không cần PT",
            borderColor: "border-[#8b5cf6]",
            isPopular: true,
            features: [
                { text: "Tất cả tính năng Free", included: true },
                { text: "AI gợi ý thực đơn & lịch", included: true },
                { text: "Barcode scan", included: true },
                { text: "Lịch sử không giới hạn", included: true },
                { text: "Export PDF báo cáo", included: true },
            ],
            buttonText: "Thử 7 ngày miễn phí",
            buttonIcon: <SparkleIcon size={20} weight="fill" />,
            buttonClasses: "bg-[#8b5cf6] text-white hover:bg-[#7c3aed]",
            link: '/',
        },
        {
            id: 3,
            title: "With PT",
            titleColor: "text-[#60a5fa]",
            price: "299k",
            duration: "/tháng",
            description: "Premium + huấn luyện viên thật",
            borderColor: "border-blue-300",
            isPopular: false,
            features: [
                { text: "Tất cả tính năng Premium", included: true },
                { text: "PT tạo lịch & meal plan riêng", included: true },
                { text: "Chat realtime với PT", included: true },
                { text: "Video call 2 lần/tháng", included: true },
            ],
            buttonText: "Tìm PT ngay",
            buttonIcon: <UserCircleCheckIcon size={20} weight="fill" />,
            buttonClasses: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
            link: '/',
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Calofit khác MyFitnessPal như thế nào?",
            answer: "Calofit được thiết kế riêng cho người Việt với database 500+ món ăn địa phương (phở, bún bò, cơm tấm) tìm kiếm dễ dàng bằng tiếng Việt. Free tier của chúng tôi cung cấp đầy đủ chức năng log bữa ăn mà không bị blur data như MFP."
        },
        {
            question: "Gói Free có đủ dùng không?",
            answer: "Hoàn toàn đủ cho việc theo dõi calo và tập luyện cơ bản. Bạn chỉ cần nâng cấp Premium khi muốn sử dụng AI gợi ý thực đơn, scan mã vạch, hoặc cần lưu trữ lịch sử dài hơn 30 ngày."
        },
        {
            question: "PT trên hệ thống là ai, chất lượng ra sao?",
            answer: "100% PT trên Calofit phải nộp chứng chỉ chuyên môn và vượt qua vòng phỏng vấn trực tiếp trước khi được active. Hệ thống rating sau mỗi tháng đảm bảo chất lượng huấn luyện luôn ở mức cao nhất."
        },
        {
            question: "Tôi có thể hủy gói đăng ký (Subscription) không?",
            answer: "Bạn có thể hủy bất cứ lúc nào chỉ với 1 click trong mục Cài đặt mà không phát sinh thêm phí. Mọi dữ liệu đã log của bạn vẫn được giữ lại trên tài khoản kể cả sau khi hủy gói."
        }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
    <>
      <HeaderLayout />
        <main>
            <section className="w-full bg-emerald-600">
                <div className="max-w-5xl mx-auto px-6 py-10 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-start text-left w-full md:w-1/2 gap-6">
                        <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase text-xs md:text-base">
                            <TrophyIcon size={24} weight="bold" />
                            <span>App dinh dưỡng & gym cho người Việt</span>
                        </div>

                        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Ăn đúng, tập đúng, đạt vóc dáng <span className="underline decoration-emerald-300 underline-offset-8">mơ ước</span>
                        </h1>

                        <p className="text-white/90 text-lg md:text-xl max-w-lg leading-relaxed">
                            Log bữa ăn tiếng Việt trong 10 giây. Tính TDEE chính xác. Lịch tập thông minh. Tất cả miễn phí — không blur, không quảng cáo.
                        </p>

                        <Link href="/onboarding" className="flex items-center gap-2 bg-white text-emerald-700 rounded-full py-4 px-8 text-lg font-bold uppercase hover:bg-emerald-50 transition-colors shadow-lg mt-2">
                            Start today <CaretRightIcon size={24} weight="bold" />
                        </Link>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative w-[300px] h-[600px] bg-white rounded-[40px] shadow-2xl border-[8px] border-emerald-800 flex items-center justify-center text-gray-500 overflow-hidden transform md:-rotate-2 transition-transform hover:rotate-0">
                            <Image src="/images/mockup.png" width={180} height={100} alt="Mockup App" className="w-full h-full bg-cover object-cover object-top"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="bg-[#1e1e1e] border-y border-zinc-800 py-10 md:py-14">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x divide-zinc-700">
                        <div className="flex flex-col items-center justify-start text-center px-4">
                            <h3 className="text-white text-4xl md:text-5xl font-bold mb-2">10k+</h3>
                            <p className="text-zinc-300 text-sm md:text-base font-medium">Người dùng Việt Nam</p>
                        </div>

                        <div className="flex flex-col items-center justify-start text-center px-4">
                            <h3 className="text-white text-4xl md:text-5xl font-bold mb-2">500+</h3>
                            <p className="text-zinc-300 text-sm md:text-base font-medium">
                                Món ăn Việt trong<br className="hidden md:block" /> database
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-start text-center px-4">
                            <h3 className="text-white text-4xl md:text-5xl font-bold mb-2">4.8★</h3>
                            <p className="text-zinc-300 text-sm md:text-base font-medium">Đánh giá trung bình</p>
                        </div>

                        <div className="flex flex-col items-center justify-start text-center px-4">
                            <h3 className="text-white text-4xl md:text-5xl font-bold mb-2">98%</h3>
                            <p className="text-zinc-300 text-sm md:text-base font-medium">Người dùng hài lòng</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Setion 3 */}
            <section className="bg-white py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-4">
                        <p className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">
                            Cách hoạt động
                        </p>
                        <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
                            Đạt mục tiêu chỉ với 3 bước
                        </h2>
                    </div>

                    <div className="flex flex-col divide-y divide-gray-400">
                        {stepsData.map((step) => (
                            <Card
                                key={step.id}
                                number={step.id}
                                title={step.title}
                                description={step.description}
                                icon={step.icon}
                            />
                        ))}
                    </div>

                </div>
            </section>

            {/*   Section 4  */}
            <section className="bg-emerald-50 py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">
                            Tính năng
                        </p>
                        <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
                            Mọi thứ bạn cần trong một nơi
                        </h2>
                    </div>

                    <div className="flex md:grid md:grid-cols-2 gap-6 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory items-stretch pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {featuresData.map((feature) => (
                            <div
                                key={feature.id}
                                className="w-[80%] sm:w-[60%] shrink-0 snap-center md:w-auto md:shrink"
                            >
                                <FeatureCard
                                    title={feature.title}
                                    description={feature.description}
                                    icon={feature.icon}
                                    colorTheme={feature.colorTheme}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Section 5 */}
            <section className="py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-10">
                        <p className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-2">
                            So sánh
                        </p>
                        <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
                            Tại sao chọn Calofit?
                        </h2>
                    </div>

                    <div className="md:grid md:grid-cols-2 gap-6 items-stretch flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                        {/* ======================================= */}
                        {/* CARD 1: MyFitnessPal */}
                        {/* ======================================= */}
                        <div className="w-[80%] sm:w-[60%] shrink-0 snap-center md:w-auto md:shrink rounded-2xl p-6 md:p-8 shadow-lg border border-emerald-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg  flex items-center justify-center text-emerald-400">
                                    <XIcon size={20} weight="bold" />
                                </div>
                                <h3 className="text-xl font-bold">MyFitnessPal</h3>
                            </div>

                            <hr className="border-[#3f3f46] mb-6" />

                            <ul className="flex flex-col gap-4">
                                {competitorFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <XIcon size={20} weight="bold" className="text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ======================================= */}
                        {/* CARD 2: Calofit */}
                        {/* ======================================= */}
                        <div className="w-[80%] sm:w-[60%] shrink-0 snap-center md:w-auto md:shrink shadow-lg rounded-2xl p-6 md:p-8 relative border border-emerald-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-emerald-600">
                                        <Image src="/images/logo-icon.svg" width={180} height={100} alt="Calofit Logo" />
                                    </div>
                                    <h3 className="text-xl font-bold">Calofit</h3>
                                </div>
                                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">
                                Tốt hơn
                            </span>
                            </div>

                            <hr className="border-[#3f3f46] mb-6" />

                            <ul className="flex flex-col gap-4">
                                {calofitFeatures.map((item, index) => (
                                    <li key={index} className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                            <CheckIcon size={20} className="text-emerald-500 shrink-0 mt-0.5 font-bold" />
                                            <span className="font-medium">{item.text}</span>
                                        </div>
                                        <span className="shrink-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">
                                        {item.badge}
                                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/*  Section 6: Review  */}
            <section className="bg-emerald-50 py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-10">
                        <p className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-2">
                            Người dùng nói gì
                        </p>
                        <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
                            Hàng nghìn người Việt đang dùng Calofit
                        </h2>
                    </div>

                    <div className="md:grid md:grid-cols-3 gap-6 items-stretch flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="w-[80%] sm:w-[60%] shrink-0 snap-center md:w-auto md:shrink"
                            >
                                <ReviewCard
                                    key={review.id}
                                    quote={review.quote}
                                    initials={review.initials}
                                    name={review.name}
                                    location={review.location}
                                    avatarColor={review.avatarColor}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/*  Section 7: Price  */}
            <section className="bg-white py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-2">
                            Bảng giá
                        </p>
                        <h2 className="text-grya-900 text-3xl md:text-4xl font-bold">
                            Bắt đầu miễn phí, nâng cấp khi cần
                        </h2>
                    </div>

                    <div className="pt-6 flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory items-stretch pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className="w-[85%] sm:w-[60%] shrink-0 snap-center md:w-auto md:shrink"
                            >
                                <PricingCard
                                    title={plan.title}
                                    titleColor={plan.titleColor}
                                    price={plan.price}
                                    duration={plan.duration}
                                    description={plan.description}
                                    features={plan.features}
                                    buttonText={plan.buttonText}
                                    buttonIcon={plan.buttonIcon}
                                    buttonClasses={plan.buttonClasses}
                                    isPopular={plan.isPopular}
                                    borderColor={plan.borderColor}
                                    link={plan.link}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/*  Section 8: Q&A  */}
            <section className="bg-emerald-50 py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-gray-900 text-3xl md:text-5xl font-bold mb-4">
                            Q&A
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Những câu hỏi thường gặp nhất về Calofit
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))}
                    </div>

                </div>
            </section>

            {/*  Section 9: Start  */}
            <section className="bg-white py-14 md:py-32">
                <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-gray-900 mb-6 shadow-lg shadow-emerald-500/20">
                        <Image src="/images/logo-icon.svg" width={180} height={100} className="w-full h-auto" alt="Calofit Logo" />
                    </div>

                    <h2 className="text--gray-900 text-3xl md:text-4xl font-bold mb-4">
                        Sẵn sàng bắt đầu?
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl mb-10">
                        Tham gia hàng nghìn người Việt đang đạt mục tiêu với Calofit
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/onboarding" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-emerald-600 bg-transparent text-emerald-600 font-bold hover:bg-emerald-700 hover:text-white transition-colors w-full sm:w-auto">
                            <RocketLaunchIcon size={20} weight="bold" className="text-emerald-600 hover:text-white" />
                            Tạo tài khoản miễn phí
                        </Link>
                        <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-emerald-600 bg-transparent text-emerald-600 font-bold hover:bg-emerald-700 hover:text-white transition-colors w-full sm:w-auto">
                            <UserCircleCheckIcon size={20} weight="bold" className="text-emerald-600 hover:text-white" />
                            Tìm hiểu With PT
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    </>
  );
}
