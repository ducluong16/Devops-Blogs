import React from 'react'
import Hero from '../components/sections/Hero'
import HomeStats from '../components/sections/home/HomeStats'
import DevOpsPipeline from '../components/sections/home/DevOpsPipeline'
import HomeProjects from '../components/sections/home/HomeProjects'
import HomeSkills from '../components/sections/home/HomeSkills'
import HomeExperience from '../components/sections/home/HomeExperience'
import HomeArticles from '../components/sections/home/HomeArticles'
import HomePhilosophy from '../components/sections/home/HomePhilosophy'
import HomeCta from '../components/sections/home/HomeCta'

function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* 1. Giới thiệu cá nhân - Trọng tâm chính trên cả Mobile & Desktop */}
      <Hero />

      {/* 2. Chỉ số thực chiến cốt lõi */}
      <HomeStats />

      {/* Các mục chi tiết chỉ hiển thị trên Desktop (Ẩn trên mobile để tối ưu trải nghiệm đọc, tránh quá tải) */}
      <div className="hidden md:block">
        <DevOpsPipeline />
        <HomeProjects />
        <HomeSkills />
        <HomeExperience />
      </div>

      {/* 3. Những bài blog gần đây - Trọng tâm trên cả Mobile & Desktop */}
      <HomeArticles />

      {/* Triết lý làm việc - Hiển thị trên Desktop */}
      <div className="hidden md:block">
        <HomePhilosophy />
      </div>

      {/* 4. Kết nối & Liên hệ nhanh */}
      <HomeCta />
    </div>
  )
}

export default Home
