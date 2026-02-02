// Import images and dummy data
import BananaBlog from '../images/blog/banana-blog.webp';
import PearBlog from '../images/blog/pear-blog.webp';

const ItemBlog = [
  {
    id: 1,
    img: BananaBlog,
    title: 'Rico Bananas are the best in the world: What is the secret?',
    desc: 'Rico Bananas are the best in the world: What is the secret?',
    author: 'Rico Stallone',
    date: '12 Oct 2023',
    time: '10:30 AM',
    content: `Rico Bananas have become a global phenomenon over the past decade. Not only because of their consistent size, but their sweetness and perfect texture have led fruit critics around the world to wonder: what is the secret?
    
    In this exclusive interview, we visited Rico's plantation in the heart of the tropics. "The key is music", Rico said with a wide smile. It turns out that every banana tree on his plantation is played classical Mozart music every morning and jazz in the afternoon. According to their internal research, these sound vibrations help optimize the absorption of nutrients from the soil.

    In addition, Rico uses a drip irrigation system mixed with a secret organic fertilizer passed down from his ancestors. "We don't use chemical pesticides. We let nature do the work," he added. The result is bananas with smooth skins and creamy flesh. Rico's banana exports have now reached Europe and the Americas, and demand continues to grow every year.`,
    link: '/blog/1'
  },

  {
    id: 2,
    img: PearBlog,
    title: 'Edward on Pears: seeds and water are the key.',
    desc: 'Edward on Pears: seeds and water are the key',
    author: 'Edward Cullen',
    date: '15 Oct 2023',
    time: '08:15 AM',
    content: `Pears are often overlooked compared to apples or oranges, but Edward, a young agriculturist, is determined to change that perception. In his experimental orchard, Edward has succeeded in growing a new pear variety called "Crystal Pear."

    "Many people water pears incorrectly," Edward explained. According to him, pears require a very specific watering cycle, plenty of water during flowering, but minimal water during fruit ripening. This technique creates a high concentration of natural sugars without compromising the pear's crisp texture.

    When ot comes to seedlings, Edward selects only seeds from pears that fall naturally and ripen perfectly on the tree. "Strong seeds come from happy fruit," he said philosophically. With this method, Edward has won national agricultural awards three years in a row. Now, he is opening online classes to teach the younger generation how to farm sustainably and with love.`,
    link: '/blog/2'
  }
]

export default ItemBlog;