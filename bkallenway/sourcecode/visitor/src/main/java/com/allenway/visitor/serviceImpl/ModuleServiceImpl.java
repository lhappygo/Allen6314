package com.allenway.visitor.serviceImpl;

import com.allenway.visitor.dao.ModuleDao;
import com.allenway.visitor.model.Module;
import com.allenway.visitor.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wuhuachuan on 16/5/30.
 */

@Service
public class ModuleServiceImpl implements ModuleService{

    @Autowired
    private ModuleDao moduleDao;

    @Override
    public void save(final Module module) {
        moduleDao.save(module);
    }

    @Override
    public Module saveAndFlush(Module module) {
        return moduleDao.saveAndFlush(module);
    }

    @Override
    public Module findById(final String moduleId) {
        return moduleDao.findOne(moduleId);
    }

    @Override
    public Module findByName(String name) {
        return moduleDao.findByName(name);
    }

    @Override
    public List<Module> findAllModules() {
        return moduleDao.findAll();
    }
}
