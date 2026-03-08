import { Topic } from "./types";

export const CORE_DOCUMENT_TEXT = `
4 Ways Schools Fail To Prepare Students For The Future Workforce
Walk into many schools today, and you’ll hear the same message on repeat: Stand out. Be exceptional. Students learn early that their value is tied to how well they rise above everyone else. But when they eventually enter the workforce, the expectations flip. Employers want collaborators. They want contributors. They want people who elevate the team, not just themselves.
This is one of the many contradictions embedded in the current education system, which is still preparing students for a world that no longer exists. Instead of equipping them with skills for today’s workplace—collaboration, adaptability, AI literacy, communication, discernment—schools are reinforcing outdated habits and sending mixed messages that leave students confused and overwhelmed.

1. Schools Prioritize “Standing Out” Over Learning to Collaborate
Students spend years being told to stand out, build the perfect portfolio, rack up leadership titles, show unique passions, and differentiate themselves from the crowd. The irony? They’re doing it alongside thousands of other students, being told the same thing in the same ways. What they don’t learn is how to create impact with other people. Collaboration is treated as a secondary skill, often reduced to the dreaded group project.
Instead of saying “work in groups,” schools can teach structured collaboration frameworks—such as team roles, consensus-building methods, conflict-resolution tools, meeting agendas, and shared responsibility rubrics. When students know how to collaborate, they become far more willing and able to do it.

2. Students Don’t See Workforce Collaboration Modeled by Adults
We ask students to collaborate while surrounding them with adults who rarely do. Teachers are encouraged to work in silos—each guarding their class time, curriculum, and grading systems. Cross-disciplinary teaching is rare. Shared planning time is limited.
Schools can model collaboration in ways students immediately recognize:
• Host cross-school hackathons and innovation challenges.
• Launch cross-department projects.
• Build partnerships with local businesses and universities.
• Coordinate extracurricular calendars so programs complement each other rather than compete.

3. How Outdated AI Policies Hurt Workforce Readiness
Another mixed message students receive: AI is cheating in high school, but is required in college. Many K–12 schools have AI policies rooted in fear. Meanwhile, universities are building AI labs, offering AI-focused majors.
Schools should not be teaching students to fear AI. They should be teaching them:
• how to use AI responsibly
• when to trust it (and when not to)
• how to evaluate AI-generated output
• how to integrate AI into research, writing, planning, and problem-solving
• how to use AI as a tool—not a replacement—for their thinking
AI literacy will soon be as essential as computer literacy.

4. The Hidden Workforce Cost of Overwork and Student Burnout
Schools proudly highlight their mental health programs: wellness clubs, awareness weeks... But none address the core problem: they don’t have time. Homework loads keep increasing.
A 2025 Challenge Success survey of more than 28,000 students found that homework and overall workload are among the most significant sources of stress.
If schools truly care about mental health, the solutions are straightforward:
• reduce excessive homework
• provide more in-class time for practice
• limit busywork
• create margin for boredom, rest, creativity, and connection
The most powerful mental health intervention we can offer is time.
`;

export const UI_TEXT = {
  header: {
    title: "English Speaking Coach",
    subtitle: "India School Visit Edition",
    subtext: "Luyện nói tiếng Anh mức B1 theo phong cách coach."
  },
  leftPanel: {
    title: "Thiết lập buổi luyện",
    topicLabel: "Chủ đề luyện nói",
    levelLabel: "Trình độ mục tiêu",
    taskLabel: "Kiểu nhiệm vụ",
    buttons: {
      newTasks: "Tạo nhiệm vụ mới",
      save: "Lưu bản luyện"
    }
  },
  centerCanvas: {
    placeholder: "Nhấn 'Tạo nhiệm vụ mới' để bắt đầu...",
    recording: "Đang nghe...",
    recordBtn: "Bắt đầu nói (Record)",
    stopBtn: "Kết thúc & Gửi",
    textFallback: "Hoặc gõ câu trả lời của bạn vào đây..."
  },
  rightPanel: {
    tabs: {
      feedback: "Coach Feedback",
      vocab: "Từ vựng & Mẫu câu",
      rapid: "Luyện phản xạ",
      history: "Lịch sử"
    }
  }
};

export const TOPIC_MAP_VN: Record<Topic, string> = {
  [Topic.COLLABORATION]: "Kỹ năng Hợp tác & Tương lai",
  [Topic.AI_LITERACY]: "Hiểu biết về AI trong trường học",
  [Topic.BURNOUT]: "Áp lực học tập & Sức khỏe tinh thần",
  [Topic.VN_VS_GLOBAL]: "Việt Nam vs Thực tiễn Quốc tế",
  [Topic.WORKSHOPS]: "Hội thảo I Can School",
  [Topic.REAL_SITUATION]: "Giao tiếp thực tế tại Ấn Độ"
};
