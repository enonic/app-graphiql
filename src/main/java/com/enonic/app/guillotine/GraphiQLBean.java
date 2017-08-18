package com.enonic.app.guillotine;

import java.util.function.Supplier;

import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.export.ExportService;
import com.enonic.xp.page.DescriptorKey;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;
import com.enonic.xp.service.ServiceDescriptorService;

public class GraphiQLBean implements ScriptBean
{
    private static final String GRAPHQL_SERVICE_NAME = "graphql";
    
    private Supplier<ServiceDescriptorService> serviceDescriptorServiceSupplier;
    

    @Override
    public void initialize( final BeanContext context )
    {
        serviceDescriptorServiceSupplier = context.getService( ServiceDescriptorService.class );
    }
    
    public boolean hasGraphQLService(final String applicationKeyString) {
        final ApplicationKey applicationKey = ApplicationKey.from( applicationKeyString );
        return serviceDescriptorServiceSupplier.get().
            getByApplication( applicationKey ).
            stream().
            anyMatch( serviceDescriptor -> GRAPHQL_SERVICE_NAME.equals( serviceDescriptor.getKey().getName() ) );
    }
}
