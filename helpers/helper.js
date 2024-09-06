import Stripe from 'stripe';
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// ฟังก์ชัน normalizeInput ที่ปรับปรุงแล้ว
export const normalizeInput = (input) => {
    if (!input || typeof input !== 'string') return ''; // ตรวจสอบข้อมูลเข้าก่อน

    let parts = input.trim().split(/[\/\s]/).filter(Boolean); // ตัดช่องว่างและกรองค่าที่ว่าง
    if (parts.length === 1) {
        return parts[0];
    } else if (parts.length === 2) {
        return `${parts[0]}/${parts[1]}`;
    } else {
        return '';
    }
}

export const scoring = (products, searchTerm, field) => {
    return products.map(product => {
        let score = 0;

        // เพิ่มคะแนนตามการตรงกันของชื่อหนังสือ
        if (product[field].toLowerCase().includes(searchTerm.toLowerCase())) {
            score += 10; // คะแนนที่เพิ่มถ้าค้นหาเจอคำที่ตรงกัน
        }

        return { ...product.toObject(), score }; // แปลงเอกสาร MongoDB เป็นออบเจ็กต์ปกติและเพิ่มคะแนน
    }).sort((a, b) => b.score - a.score); // เรียงลำดับตามคะแนนจากมากไปน้อย
}

// ใช้ export แบบ named export สำหรับการส่งออกฟังก์ชันทั้งสอง
