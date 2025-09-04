'use client';

import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

export default function PageCapture() {

    const handleCapture = async () => {
        try {
            // 페이지 전체를 캡처 (body 기준)
            const canvas = await html2canvas(document.body, {
                useCORS: true,
                allowTaint: true,
                scrollY: -window.scrollY,
                scrollX: -window.scrollX,
            });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height], // 캔버스 크기 그대로
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('강원경 포트폴리오.pdf');
        } catch (err) {
            // console.error('PDF 생성 중 오류:', err);
        }
    };

    return (
        <button
            onClick={handleCapture}
            className="block px-4 py-2 hover:bg-gray-100"
        >
            PDF Download
        </button>
    );
}
