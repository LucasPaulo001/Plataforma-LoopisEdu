import styles from "./Classes.module.css"
import { useClass } from "../../contexts/classesContext"
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export const Classes = () => {

    const { classes, loading } = useClass()

    const navigate = useNavigate()

    return (
        <div className={styles.containerClasses}>
            <h1>Últimas postagens</h1>
            <div className={styles.content}>
                {/* Aqui ao clicar na imagem o usuário será redirecionado a uma página dedicada a aula, como 
                usdemy */}
                {loading ? (
                    <h1>Carregando aulas...</h1>
                ) : (
                    <Swiper
                        slidesPerView={3}
                        navigation={true}
                        spaceBetween={10}
                        modules={[Navigation]}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            
                        }}
                    >
                        {classes.map((aula) => (
                            <SwiperSlide className={styles.swiperSlider} key={aula._id}>
                                <img
                                    className={styles.iconAula}
                                    src={aula.thumbnailVideo}
                                    alt="video"
                                    onClick={() => navigate(`/aula/${aula._id}`)}
                                />
                                <h3 style={{textAlign: "center"}}>{aula.title}</h3>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )

                }
            </div>
        </div>
    )
}