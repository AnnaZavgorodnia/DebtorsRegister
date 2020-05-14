package ua.gov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @GetMapping("/")
    public String mainPage(){
        return "search_debtor";
    }

    @GetMapping("/login")
    public String loginForm(@RequestParam(value = "error", required = false) String error,
                            @RequestParam(value = "logout", required = false) String logout,
                            Model model){
        model.addAttribute("error", error != null);
        model.addAttribute("logout", logout != null);
        return "login";
    }

    @GetMapping("/search-debtor")
    public String searchDebtorPage(){
        return "search_debtor";
    }

    @GetMapping("/alimony-debtors")
    public String alimonyDebtors(){
        return "alimony_debtors";
    }

    @GetMapping("/child-dates-debtors")
    public String childDatesDebtors(){
        return "child_dates_debtors";
    }

    @GetMapping("/wages-debtors")
    public String wagesDebtors(){
        return "wages_debtors";
    }

    @GetMapping("/create-debt")
    public String createDebt(){
        return "create_debt";
    }

    @GetMapping("/detailed-record-info")
    public String detailedRecordInfo(){
        return "detailed_record_info";
    }

    @GetMapping("/all-profiles")
    public String allProfiles(){
        return "all_profiles";
    }

    @GetMapping("/create-registers-profile")
    public String createRegProfile(){
        return "create_registers_profile";
    }

    @GetMapping("/profile")
    public String profile(){
        return "profile";
    }

    @GetMapping("/search-registers-profile")
    public String searchRegistersProfile(){
        return "search_registers_profile";
    }

    @GetMapping("/update-debt")
    public String updateDebt(){
        return "update_debt";
    }

    @GetMapping("/update-profile")
    public String updateProfile(){
        return "update_profile";
    }

}
