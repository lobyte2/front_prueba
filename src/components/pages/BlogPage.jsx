import { useState, useEffect } from 'react';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import { getBlogPosts } from '../../api/db';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const sectionStyle = {
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        background: '#fff'
    };

    const imageStyle = {
        maxWidth: '400px',
        width: '100%',
        display: 'block',
        margin: '20px auto',
        borderRadius: '8px'
    };

    // Cargar los posteos de la API
    useEffect(() => {
        setLoading(true);
        getBlogPosts()
            .then(setPosts)
            .catch(err => console.error("Error al cargar el blog:", err))
            .finally(() => setLoading(false));
    }, []); 

    if (loading) {
        return (
            <MainLayout>
                <Heading level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>Blog</Heading>
                <Text style={{ textAlign: 'center' }}>Cargando posteos...</Text>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: '800px', margin: '40px auto' }}>
                <Heading level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>Blog</Heading>

                {/* Sección Novedades */}
                <div style={sectionStyle}>
                    <Heading level={2}>Novedades de la tienda</Heading>
                    {posts.filter(p => p.tipo === 'novedad').map(post => (
                        <div key={post.id}>
                            <Text>{post.texto}</Text>
                            <img 
                                src={post.urlImagen} 
                                alt={post.altImagen} 
                                style={imageStyle} 
                            />
                        </div>
                    ))}
                </div>

                {/* Sección Datos Curiosos */}
                <div style={sectionStyle}>
                    <Heading level={2}>Datos curiosos</Heading>
                    {posts.filter(p => p.tipo === 'dato').map((post, index, arr) => (
                        <div key={post.id}>
                            <Text>{post.texto}</Text>
                            <img 
                                src={post.urlImagen} 
                                alt={post.altImagen} 
                                style={imageStyle} 
                            />
                            {index < arr.length - 1 && (
                                <hr style={{ margin: '40px 0', border: '1px solid #eee' }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default BlogPage;