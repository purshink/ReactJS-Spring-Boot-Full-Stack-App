package com.example.hobbie.service.impl;


import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.*;
import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
import com.example.hobbie.model.repostiory.CategoryRepository;
import com.example.hobbie.model.repostiory.HobbyRepository;
import com.example.hobbie.model.service.HobbyServiceModel;
import com.example.hobbie.model.service.UpdateHobbyServiceModel;
import com.example.hobbie.service.*;
import com.example.hobbie.view.HobbyCardViewModel;
import com.example.hobbie.view.HobbyViewModel;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;


@Service
@Transactional
public class HobbyServiceImpl implements HobbyService {
    private final ModelMapper modelMapper;
    private final HobbyRepository hobbyRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final LocationService locationService;
    private final AboService aboService;
    private final ShoppingCartService shoppingCartService;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public HobbyServiceImpl(ModelMapper modelMapper, HobbyRepository hobbyRepository, CategoryRepository mockCategoryRepository, CategoryService categoryService, UserService userService, LocationService locationService, AboService aboService, ShoppingCartService shoppingCartService, CloudinaryService cloudinaryService) {
        this.modelMapper = modelMapper;
        this.hobbyRepository = hobbyRepository;
        this.categoryService = categoryService;
        this.userService = userService;
        this.locationService = locationService;
        this.aboService = aboService;
        this.shoppingCartService = shoppingCartService;
        this.cloudinaryService = cloudinaryService;
    }


    @Override
    public Long createHobby(HobbyServiceModel hobbyServiceModel, String fileName) throws IOException {

        Hobby hobby = this.modelMapper.map(hobbyServiceModel, Hobby.class);
        hobby.setCategory(this.categoryService.findByName(hobbyServiceModel.getCategory()));
        hobby.setBusinessOwner(this.userService.findCurrentUserBusinessOwner());
        hobby.setLocation(this.locationService.getLocationByName(hobbyServiceModel.getLocation()));
//        hobby.setPhotos(fileName);

        MultipartFile img = hobbyServiceModel.getImg();

        String imageUrl = cloudinaryService.uploadImage(img);
        hobby.setImgUrl(imageUrl);

        Hobby savedHobby = this.hobbyRepository.save(hobby);
        return savedHobby.getId();

    }

    @Override
    public List<HobbyViewModel> getAllHobbyOffers() {
        BusinessOwner currentUserBusinessOwner = this.userService.findCurrentUserBusinessOwner();
        List<Hobby> allHobies = this.hobbyRepository.findAllByBusinessOwnerBusinessName(currentUserBusinessOwner.getBusinessName());

        return allHobies.stream().map(hobby -> this.modelMapper.map(hobby, HobbyViewModel.class)).collect(Collectors.toList());
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

    @Override
    public void saveUpdatedHobby(UpdateHobbyServiceModel updateHobbyServiceModel, String fileName) throws IOException {

        Hobby hobby = this.modelMapper.map(updateHobbyServiceModel, Hobby.class);
        hobby.setCategory(this.categoryService.findByName(updateHobbyServiceModel.getCategory()));
//        hobby.setPhotos(fileName);
        hobby.setLocation(this.locationService.getLocationByName(updateHobbyServiceModel.getLocation()));
        hobby.setBusinessOwner(this.userService.findCurrentUserBusinessOwner());

        MultipartFile img = updateHobbyServiceModel.getImg();
        String imageUrl = cloudinaryService.uploadImage(img);
        hobby.setImgUrl(imageUrl);
        this.hobbyRepository.save(hobby);

    }

    @Override
    public void deleteHobby(long id) throws IOException {
//        String uploadDir = "hobby-photos/" + id;
        Optional<Hobby> byId = this.hobbyRepository.findById(id);
        if(byId.isPresent()){
//            FileUtils.deleteDirectory(new File(uploadDir));
            this.userService.findAndRemoveHobbyFromClientsRecords(byId.get());
            this.aboService .findExcistingAbosWithHobbyId(id);
            this.shoppingCartService.removeProductFromCart(id);
            this.hobbyRepository.deleteById(id);
        }
        else {
            throw new NotFoundException("Hobby does not exist");
        }

    }

    @Override
    public List<Hobby> initHobbyOffers() {

        List<Hobby> offers = new ArrayList<>();
        if (hobbyRepository.count() == 0) {

            //1
            Hobby climbing = new Hobby();
            climbing.setName("Climbing");
            climbing.setDescription("Rock climbing is a sport in which participants climb up, down or across natural rock formations or artificial rock walls. The goal is to reach the summit of a formation or the endpoint of a usually pre-defined route without falling. Rock climbing is a physically and mentally demanding sport, one that often tests a climber's strength, endurance, agility and balance along with mental control. Knowledge of proper climbing techniques and the use of specialized climbing equipment is crucial for the safe completion of routes.\n" +
                    "\n" +
                    "Because of the wide range and variety of rock formations around the world, rock climbing has been separated into several different styles and sub-disciplines, such as scrambling, another activity involving the scaling of hills and similar formations, differentiated by rock climbing's sustained use of hands to support the climber's weight as well as to provide balance.");

            climbing.setCategory(this.categoryService.findByName(CategoryNameEnum.ACTIVE));
            climbing.setBusinessOwner(this.userService.findBusinessOwnerById(3L));
            climbing.setPrice(new BigDecimal("73"));
//            climbing.setProfilePhoto("1.jpg");
            climbing.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
            offers.add(climbing);
            this.hobbyRepository.save(climbing);
            //2
            Hobby dancing = new Hobby();
            dancing.setName("Dancing");
            dancing.setDescription("Dance is a performing art form consisting of purposefully selected sequences of human movement. This movement has aesthetic and symbolic value, and is acknowledged as dance by performers and observers within a particular culture. Dance can be categorized and described by its choreography, by its repertoire of movements, or by its historical period or place of origin.\n" +
                    "\n" +
                    "An important distinction is to be drawn between the contexts of theatrical and participatory dance, although these two categories are not always completely separate; both may have special functions, whether social, ceremonial, competitive, erotic, martial, or sacred/liturgical. Other forms of human movement are sometimes said to have a dance-like quality, including martial arts, gymnastics, cheerleading, figure skating, synchronised swimming, marching bands, and many other forms of athletics.");

            dancing.setCategory(this.categoryService.findByName(CategoryNameEnum.FUN));
            dancing.setBusinessOwner(this.userService.findBusinessOwnerById(3L));
            dancing.setPrice(new BigDecimal("62.40"));
//            dancing.setProfilePhoto("2.jpg");
            dancing.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
            offers.add(dancing);
            this.hobbyRepository.save(dancing);
            //3
            Hobby horseRiding = new Hobby();
            horseRiding.setName("Horse riding");
            horseRiding.setDescription("What is Equestrian Tourism?\n" +
                    "The Equestrian Tourism is an activity that combines the passion for horse riding with the interest to visit different regions, provinces and countries, which allows to discover different cultures, other people and typical gastronomy.\n" +
                    "\n" +
                    "Is it difficult to ride a horse?\n" +
                    "The practice of horse riding is known as equitation and it is relatively simple to start with, at least to be able to go on rides in the countryside. If your interest grows further, you will want to improve your riding skills and acquire more knowledge about horses.\n" +
                    "\n" +
                    "How fast your skills improve depend on every individual and on your purpose, you can ride for pleasure in the nature in all types of terrain or choose an equestrian sport and train professionally.\n" +
                    "\n");
            horseRiding.setCategory(this.categoryService.findByName(CategoryNameEnum.ACTIVE));
            horseRiding.setBusinessOwner(this.userService.findBusinessOwnerById(3L));
            horseRiding.setPrice(new BigDecimal("162.20"));
//            horseRiding.setProfilePhoto("3.jpg");
            horseRiding.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
            offers.add(horseRiding);
            this.hobbyRepository.save(horseRiding);

            //4
            Hobby yoga = new Hobby();
            yoga.setName("Yoga");
            yoga.setDescription("The origins of yoga are shrouded in the mists of time. The ancient wisdom known as \"the supreme science of life\" is believed to have been revealed to the great sages of India several thousand years ago.\n" +
                    "\n" +
                    "Yoga is an ancient system of physical and mental practices that originated during the Indus Valley civilization in South Asia. The fundamental purpose of yoga is to foster harmony in the body, mind, and environment.\n" +
                    "\n" +
                    "Yoga professes a complete system of physical, mental, social, and spiritual development. For generations, this philosophy was passed on from the master teacher to the student. The first written records of the practice of yoga appeared around 200 BC in Yogasutra of Patanjali. The system consisted of the eightfold path or Asthangayoga.");
            yoga.setCategory(this.categoryService.findByName(CategoryNameEnum.RELAX));
            yoga.setBusinessOwner(this.userService.findBusinessOwnerById(3L));
            yoga.setPrice(new BigDecimal("52.40"));
//            yoga.setProfilePhoto("2.jpg");
            yoga.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
            offers.add(yoga);
            this.hobbyRepository.save(yoga);

            //5
            Hobby painting = new Hobby();
            painting.setName("Painting");
            painting.setDescription("There are ten people per class, beginner or advanced. Students can bring their own personal projects. Here, nothing is compulsory, everything depends on the will of each person and you are free to choose your favorite material (oil, acrylic, watercolour, pastel, pencils, etc.).\n" +
                    "\n" +
                    "The teacher will be happy to advise you and teach you the different techniques necessary to achieve your project. The teacher will help to develop the students perception and feeling in order to create with ones personality and originality. For beginners, she will guide you through the different basic drawing or painting techniques and will help you find a project that you like. A small library is available to inspire you.\n" +
                    "\n" +
                    "Life of Art is a place where all senses are stimulated; natural daylight, incense and music to help you relax. The goal is to create an atmosphere where your mind feels at ease and is not blocking your sensitivity and your imagination. Over time, students refine their technique and creativity.");
            painting.setCategory(this.categoryService.findByName(CategoryNameEnum.CREATIVE));
            painting.setBusinessOwner(this.userService.findBusinessOwnerById(3L));
            painting.setPrice(new BigDecimal("40"));
//            painting.setProfilePhoto("5.jpg");
            painting.setLocation(this.locationService.getLocationByName(LocationEnum.ZURICH));
            offers.add(painting);
            this.hobbyRepository.save(painting);
        }
            return offers;
    }

    @Override
    public List<Hobby> findHobbyMatches(AppClient currentUserAppClient) {
        List<Hobby> hobby_matches = new ArrayList<>();
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
    public List<HobbyCardViewModel> getHobbyMatches(AppClient currentAppClient) {
     return   findHobbyMatches(currentAppClient)
                .stream().map(hobby -> this.modelMapper.map(hobby, HobbyCardViewModel.class)).collect(Collectors.toList());
    }

    @Override
    public void saveHobbyForClient(Hobby hobby) {
        AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
        Optional<Hobby> hobbyById = this.hobbyRepository .findById(hobby.getId());
        List<Hobby> saved_hobbies = currentUserAppClient.getSaved_hobbies();

            if(hobbyById.isPresent() && !(saved_hobbies.contains(hobbyById.get()))) {
                saved_hobbies.add(hobbyById.get());
            }
    }

    @Override
    public void removeHobbyForClient(Hobby hobby) {
        AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
        Optional<Hobby> hobbyById = this.hobbyRepository .findById(hobby.getId());
        hobbyById.ifPresent(value -> currentUserAppClient.getSaved_hobbies().remove(value));
    }

    @Override
    public boolean isHobbySaved(Long hobbyId) {
        AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
        Optional<Hobby> byId = this.hobbyRepository.findById(hobbyId);
        return byId.filter(hobby -> currentUserAppClient.getSaved_hobbies().contains(hobby)).isPresent();

    }

    @Override
    public List<Hobby> findSavedHobbies(AppClient currentAppClient) {
        return currentAppClient.getSaved_hobbies();
    }
}

