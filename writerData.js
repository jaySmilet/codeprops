const writers = {
  admin: {
    name: 'Jayganesh Gupta',
    role: 'Admin',
    photo: 'https://assets.codevichar.com/writers-pic/jayganesh-gupta.webp',
    profileUrl: 'https://www.linkedin.com/in/jayganesh-gupta'
  },
  rajat_gupta: {
    name: 'Rajat Gupta',
    role: 'Writer',
    photo: '',
    profileUrl: 'https://www.linkedin.com/in/rajat-gupta-37a463212'
  }
  // Add more writers here
};

const writerPosts = {
  admin: ['9065388885961233741', '7350547149860411588', '45602419137120732', '916278593117035825','8488116656687112237'],
  rajat_gupta: ['7761740006827282118']
  // Add more mappings here
};

function getWriterIdByPostId(postId) {
  for (const writerId in writerPosts) {
    if (writerPosts[writerId].includes(postId)) {
      return writerId;
    }
  }
  return 'admin';
}

