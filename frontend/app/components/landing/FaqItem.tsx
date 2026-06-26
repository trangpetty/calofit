import { CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import {FaqItemProps} from "@/app/types/landing";

export default function FaqItem ({ question, answer, isOpen, onClick }: FaqItemProps) {
    return (
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all hover:border-emerald-500 hover:shadow-sm">
            <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={onClick}
            >
                <span className="font-bold text-gray-900 text-lg">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 shrink-0 ml-4"
                >
                    <CaretDown size={24} weight="bold" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};