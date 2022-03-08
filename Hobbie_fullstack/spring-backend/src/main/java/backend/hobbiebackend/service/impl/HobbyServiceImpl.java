package backend.hobbiebackend.service.impl;


import backend.hobbiebackend.handler.NotFoundException;
import backend.hobbiebackend.model.entities.*;
import backend.hobbiebackend.model.entities.enums.CategoryNameEnum;
import backend.hobbiebackend.model.entities.enums.LocationEnum;
import backend.hobbiebackend.model.repostiory.HobbyRepository;
import backend.hobbiebackend.service.CategoryService;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.LocationService;
import backend.hobbiebackend.service.UserService;
import com.cloudinary.Cloudinary;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;


@Service
@Transactional
public class HobbyServiceImpl implements HobbyService {
    private final HobbyRepository hobbyRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final LocationService locationService;
    private  final  Cloudinary cloudinary;



    @Autowired
    public HobbyServiceImpl( HobbyRepository hobbyRepository, CategoryService categoryService, UserService userService, LocationService locationService, Cloudinary cloudinary) {
        this.hobbyRepository = hobbyRepository;
        this.categoryService = categoryService;
        this.userService = userService;
        this.locationService = locationService;
        this.cloudinary = cloudinary;
    }





    @Override
    public Hobby findHobbieById(Long id) {
        Optional<Hobby> hobby = this.hobbyRepository.findById(id);
        if (hobby.isPresent()) {
            return hobby.get();
        } else {
            throw new NotFoundException("This hobby does not exist");
        }
    }

    @SneakyThrows
    @Override
    public void saveUpdatedHobby(Hobby hobby)  {

        Optional<Hobby> byId = this.hobbyRepository.findById(hobby.getId());
        if (byId.isPresent()){
            deleteResourcesById(byId.get());
        }

        this.hobbyRepository.save(hobby);

    }
    @Override
    public boolean deleteHobby(long id) throws Exception {

        Optional<Hobby> byId = this.hobbyRepository.findById(id);
        if(byId.isPresent()){
            deleteResourcesById(byId.get());
            this.userService.findAndRemoveHobbyFromClientsRecords(byId.get());
            this.hobbyRepository.deleteById(id);
            return true;
        }

        return false;
    }

    private void deleteResourcesById(Hobby byId) throws Exception {
        String profileImgUrl = byId.getProfileImg_id();
        String galleryImgUrl1 = byId.getGalleryImg1_id();
        String galleryImgUrl2 = byId.getGalleryImg2_id();
        String galleryImgUrl3 = byId.getGalleryImg3_id();


        cloudinary.api().deleteResources(Arrays.asList(profileImgUrl, galleryImgUrl1,galleryImgUrl2,galleryImgUrl3),
                Map.of("invalidate", true ));

    }


//    @Override
//    public List<Hobby> initHobbyOffers() {
//
//        List<Hobby> offers = new ArrayList<>();
//        if (hobbyRepository.count() == 0) {
//
//            //1
//            Hobby climbing = new Hobby();
//            climbing.setName("Climbing");
//            climbing.setDescription("Rock climbing is a sport in which participants climb up, down or across natural rock formations or artificial rock walls. The goal is to reach the summit of a formation or the endpoint of a usually pre-defined route without falling. Rock climbing is a physically and mentally demanding sport, one that often tests a climber's strength, endurance, agility and balance along with mental control. Knowledge of proper climbing techniques and the use of specialized climbing equipment is crucial for the safe completion of routes.\n" +
//                    "\n" +
//                    "Because of the wide range and variety of rock formations around the world, rock climbing has been separated into several different styles and sub-disciplines, such as scrambling, another activity involving the scaling of hills and similar formations, differentiated by rock climbing's sustained use of hands to support the climber's weight as well as to provide balance.");
//
//            climbing.setCategory(this.categoryService.findByName(CategoryNameEnum.ACTIVE));
//            climbing.setCreator("business");
//            climbing.setPrice(new BigDecimal("73"));
//            climbing.setProfileImgUrl("https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg");
//            climbing.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
//            offers.add(climbing);
//            this.hobbyRepository.save(climbing);
//            //2
//            Hobby dancing = new Hobby();
//            dancing.setName("Dancing");
//            dancing.setDescription("Dance is a performing art form consisting of purposefully selected sequences of human movement. This movement has aesthetic and symbolic value, and is acknowledged as dance by performers and observers within a particular culture. Dance can be categorized and described by its choreography, by its repertoire of movements, or by its historical period or place of origin.\n" +
//                    "\n" +
//                    "An important distinction is to be drawn between the contexts of theatrical and participatory dance, although these two categories are not always completely separate; both may have special functions, whether social, ceremonial, competitive, erotic, martial, or sacred/liturgical. Other forms of human movement are sometimes said to have a dance-like quality, including martial arts, gymnastics, cheerleading, figure skating, synchronised swimming, marching bands, and many other forms of athletics.");
//
//            dancing.setCategory(this.categoryService.findByName(CategoryNameEnum.FUN));
//            dancing.setCreator("business");
//            dancing.setPrice(new BigDecimal("62.40"));
//            dancing.setProfileImgUrl("https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg");
//            dancing.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
//            offers.add(dancing);
//            this.hobbyRepository.save(dancing);
//            //3
//            Hobby horseRiding = new Hobby();
//            horseRiding.setName("Horse riding");
//            horseRiding.setDescription("What is Equestrian Tourism?\n" +
//                    "The Equestrian Tourism is an activity that combines the passion for horse riding with the interest to visit different regions, provinces and countries, which allows to discover different cultures, other people and typical gastronomy.\n" +
//                    "\n" +
//                    "Is it difficult to ride a horse?\n" +
//                    "The practice of horse riding is known as equitation and it is relatively simple to start with, at least to be able to go on rides in the countryside. If your interest grows further, you will want to improve your riding skills and acquire more knowledge about horses.\n" +
//                    "\n" +
//                    "How fast your skills improve depend on every individual and on your purpose, you can ride for pleasure in the nature in all types of terrain or choose an equestrian sport and train professionally.\n" +
//                    "\n");
//            horseRiding.setCategory(this.categoryService.findByName(CategoryNameEnum.ACTIVE));
//            horseRiding.setCreator("business");
//            horseRiding.setPrice(new BigDecimal("162.20"));
//            horseRiding.setProfileImgUrl("https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg");
//            horseRiding.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
//            offers.add(horseRiding);
//            this.hobbyRepository.save(horseRiding);
//
//            //4
//            Hobby yoga = new Hobby();
//            yoga.setName("Yoga");
//            yoga.setDescription("The origins of yoga are shrouded in the mists of time. The ancient wisdom known as \"the supreme science of life\" is believed to have been revealed to the great sages of India several thousand years ago.\n" +
//                    "\n" +
//                    "Yoga is an ancient system of physical and mental practices that originated during the Indus Valley civilization in South Asia. The fundamental purpose of yoga is to foster harmony in the body, mind, and environment.\n" +
//                    "\n" +
//                    "Yoga professes a complete system of physical, mental, social, and spiritual development. For generations, this philosophy was passed on from the master teacher to the student. The first written records of the practice of yoga appeared around 200 BC in Yogasutra of Patanjali. The system consisted of the eightfold path or Asthangayoga.");
//            yoga.setCategory(this.categoryService.findByName(CategoryNameEnum.RELAX));
//            yoga.setCreator("business");
//            yoga.setPrice(new BigDecimal("52.40"));
//            yoga.setProfileImgUrl("https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640762666/eflbtmfo49w5bxqhagna.jpg");
//            yoga.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
//            offers.add(yoga);
//            this.hobbyRepository.save(yoga);
//
//            //5
//            Hobby painting = new Hobby();
//            painting.setName("Painting");
//            painting.setDescription("There are ten people per class, beginner or advanced. Students can bring their own personal projects. Here, nothing is compulsory, everything depends on the will of each person and you are free to choose your favorite material (oil, acrylic, watercolour, pastel, pencils, etc.).\n" +
//                    "\n" +
//                    "The teacher will be happy to advise you and teach you the different techniques necessary to achieve your project. The teacher will help to develop the students perception and feeling in order to create with ones personality and originality. For beginners, she will guide you through the different basic drawing or painting techniques and will help you find a project that you like. A small library is available to inspire you.\n" +
//                    "\n" +
//                    "Life of Art is a place where all senses are stimulated; natural daylight, incense and music to help you relax. The goal is to create an atmosphere where your mind feels at ease and is not blocking your sensitivity and your imagination. Over time, students refine their technique and creativity.");
//            painting.setCategory(this.categoryService.findByName(CategoryNameEnum.CREATIVE));
//            painting.setCreator("business");
//            painting.setPrice(new BigDecimal("40"));
//            painting.setProfileImgUrl("https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg");
//            painting.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
//            offers.add(painting);
//            this.hobbyRepository.save(painting);
//        }
//            return offers;
//    }

    @Override
    public Set<Hobby> findHobbyMatches(String username) {
        AppClient currentUserAppClient = this.userService.findAppClientByUsername(username);
        Set<Hobby> hobby_matches = new HashSet<>();
        if(currentUserAppClient.getTestResults() != null) {
            boolean isAdded = false;
            Random rand = new Random();
            LocationEnum location = currentUserAppClient.getTestResults().getLocation();
            Location locationByName = this.locationService.getLocationByName(location);
            List<Hobby> allByLocation = this.hobbyRepository.findAllByLocation(locationByName);
            List<CategoryNameEnum> testCategoryResults = new ArrayList<>();

            testCategoryResults.add(currentUserAppClient.getTestResults().getCategoryOne());
            testCategoryResults.add(currentUserAppClient.getTestResults().getCategoryTwo());
            testCategoryResults.add(currentUserAppClient.getTestResults().getCategoryThree());
            testCategoryResults.add(currentUserAppClient.getTestResults().getCategoryFour());
            testCategoryResults.add(currentUserAppClient.getTestResults().getCategoryFive());
            testCategoryResults.add(currentUserAppClient.getTestResults().getCategorySix());

            if (allByLocation.size() > 0) {

                for (int i = 0; i < 10; i++) {
                    int randomIndex = rand.nextInt(allByLocation.size());
                    Hobby randomHobby = allByLocation.get(randomIndex);
                    if (hobby_matches.contains(randomHobby)) {
                        continue;
                    }
                    for (CategoryNameEnum testCategory : testCategoryResults) {
                        if (randomHobby.getCategory().getName().equals(testCategory)) {
                            hobby_matches.add(randomHobby);
                            isAdded = true;
                        }
                        if (isAdded) {
                            isAdded = false;
                            break;
                        }
                    }
                }
            }
        }

        return hobby_matches;
    }



    @Override
    public boolean saveHobbyForClient(Hobby hobby, String username) {
        AppClient currentUserAppClient = this.userService.findAppClientByUsername(username);
        Optional<Hobby> hobbyById = this.hobbyRepository.findById(hobby.getId());
        List<Hobby> saved_hobbies = currentUserAppClient.getSaved_hobbies();

            if(hobbyById.isPresent() && !(saved_hobbies.contains(hobbyById.get()))) {
                saved_hobbies.add(hobbyById.get());
                return true;
            }

            return false;
    }

    @Override
    public boolean removeHobbyForClient(Hobby hobby, String username) {
        AppClient currentUserAppClient = this.userService.findAppClientByUsername(username);
        Optional<Hobby> hobbyById = this.hobbyRepository.findById(hobby.getId());
        if(currentUserAppClient != null){
            hobbyById.ifPresent(value -> currentUserAppClient.getSaved_hobbies().remove(value));
            return true;
        }
            return false;
    }

    @Override
    public boolean isHobbySaved(Long hobbyId, String username) {
        Optional<Hobby> byId = this.hobbyRepository.findById(hobbyId);
        if(byId.isPresent()) {
            AppClient currentUserAppClient = this.userService.findAppClientByUsername(username);

            return currentUserAppClient.getSaved_hobbies().contains(byId.get());
        }

        return false;

    }

    @Override
    public List<Hobby> findSavedHobbies(AppClient currentAppClient) {
        return currentAppClient.getSaved_hobbies();
    }

    @Override
    public Set<Hobby> getAllHobbiesForBusiness(String username) {

        return this.hobbyRepository.findAllByCreator(username);
    }

    @Override
    public Set<Hobby> getAllHobbieMatchesForClient(String username) {
        AppClient currentUserAppClient = this.userService.findAppClientByUsername(username);

        return currentUserAppClient.getHobby_matches();
    }

    @Override
    public void createHobby(Hobby offer) {
        this.hobbyRepository.save(offer);
    }

}

