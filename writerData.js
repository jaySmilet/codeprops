const writers = {
  admin: {
    name: "Jayganesh Gupta",
    role: "Admin",
    photo: "https://assets.codevichar.com/writers-pic/jayganesh-gupta.webp",
    profileUrl: "https://www.linkedin.com/in/jayganesh-gupta",
  },
  rajat_gupta: {
    name: "Rajat Gupta",
    role: "Writer",
    photo: "https://assets.codevichar.com/writers-pic/rajat-gupta.webp",
    profileUrl: "https://www.linkedin.com/in/rajat-gupta-37a463212",
  },
  mohammed_farooque_kazi: {
    name: "Mohammed Farooque Kazi",
    role: "Writer",
    photo:
      "https://assets.codevichar.com/writers-pic/mohammed_farooque_kazi.webp",
    profileUrl:
      "https://www.linkedin.com/in/mohammed-farooque-kazi-contentwriter-digitalmarketingspecialist/",
  },
  // Add more writers here
};

const writerPosts = {
  admin: [
    "9065388885961233741",
    "7350547149860411588",
    "45602419137120732",
    "916278593117035825",
    "8488116656687112237",
    "1862014061274520134",
  ],
  rajat_gupta: ["7761740006827282118"],
  mohammed_farooque_kazi: ["7426921082384135961"],
  // Add more mappings here
};

function getWriterIdByPostId(postId) {
  for (const writerId in writerPosts) {
    if (writerPosts[writerId].includes(postId)) {
      return writerId;
    }
  }
  return "admin";
}
