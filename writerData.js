const writers = {
  admin: {
    name: 'Jayganesh Gupta',
    role: 'Admin',
    photo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEig1NzTuAl0v4I9oOLJ9zizxOFjD1U812KuYlq_1y3r9R-r51CQBYNpkTiVYqZj6TomAMcbh7nqeTewzWFWpFuGTRLH-VnBXjslcxaiIPtB0x3PRqHb7VuiMETfX59WgsSG2RjaKblnShCE-4f3OxV0a0K5rk1bs7D0u_yYhCHFHXOpuGM/s1600/1000030798.jpg',
    profileUrl: 'https://www.linkedin.com/in/jayganesh-gupta'
  },
  rajat_gupta: {
    name: 'Rajat Gupta',
    role: 'Writer',
    photo: '',
    profileUrl: 'https://writer1profile.link'
  }
  // Add more writers here
};

const writerPosts = {
  admin: ['4381421792996858996', '4546568252534693486',],
  rajat_gupta: ['8094892859165856464', '3215585198392231583']
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

